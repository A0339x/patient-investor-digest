import json
import os
import subprocess
import sys
from datetime import datetime, timezone

import feedparser
import requests

RSS_FEEDS = [
    "https://www.theblock.co/rss.xml",
    "https://decrypt.co/feed",
    "https://cryptopanic.com/news/defi/rss/",
    "https://cryptopanic.com/news/ethereum/rss/",
]

STATE_FILE = "scripts/.digest_state.json"
DATA_FILE = "data.js"


def fetch_prices():
    try:
        resp = requests.get(
            "https://api.coingecko.com/api/v3/simple/price",
            params={"ids": "bitcoin,ethereum", "vs_currencies": "usd", "include_24hr_change": "true"},
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()
        btc = data["bitcoin"]
        eth = data["ethereum"]
        return {
            "btc_price": btc["usd"],
            "btc_change": btc["usd_24h_change"],
            "eth_price": eth["usd"],
            "eth_change": eth["usd_24h_change"],
        }
    except Exception as e:
        print(f"Warning: could not fetch prices: {e}", file=sys.stderr)
        return {"btc_price": "N/A", "btc_change": 0, "eth_price": "N/A", "eth_change": 0}


def fetch_rss_headlines():
    articles = []
    for url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:5]:
                summary = getattr(entry, "summary", "") or ""
                summary = summary[:300]
                articles.append({"title": entry.title, "summary": summary, "source": feed.feed.get("title", url)})
        except Exception as e:
            print(f"Warning: could not fetch {url}: {e}", file=sys.stderr)
    return articles


def build_prompt(today, prices, articles):
    articles_text = "\n".join(
        f"- [{a['source']}] {a['title']}: {a['summary']}" for a in articles
    )
    btc_sign = "+" if prices["btc_change"] >= 0 else ""
    eth_sign = "+" if prices["eth_change"] >= 0 else ""
    return f"""Today is {today}.

BTC: ${prices['btc_price']:,} ({btc_sign}{prices['btc_change']:.1f}% 24h)
ETH: ${prices['eth_price']:,} ({eth_sign}{prices['eth_change']:.1f}% 24h)

Recent crypto news headlines:
{articles_text}

You are writing a digest for the Patient Investor LP Mastermind. Members are early in their LP journey -- they know how to rebalance positions on Uniswap V3/V4 and understand the basics, but they're still learning the cause-and-effect: why a skewed range captures more appreciation than a centered one, when widening beats rebalancing, how range width affects fee capture in volatile pairs. This digest is a teaching tool, not a power-user newsletter. Each story should be a small learning moment -- explain what happened in plain language, then unpack what it means for how they set up and manage their ranges. If you use a technical term (tick spacing, JIT, MEV, LRT, oracle depeg, etc.), briefly define it the first time it appears in that issue. Prefer concrete examples ("if your range is $3,000-$3,500 and ETH drops to $2,800...") over abstractions. The spark question should open a door to deeper understanding a thoughtful beginner can reflect on -- not a debate topic for veterans.

Do NOT mention "impermanent loss" or the abbreviation "IL" anywhere in the digest. Talk about range mechanics, fee capture, price exposure, or asset composition directly -- never by that label.

Return ONLY a valid JSON object with no markdown fencing, no explanation, no commentary -- just the raw JSON.

Required structure:
{{
  "id": "month-day-year",
  "date": "April 21, 2026",
  "title": "LP Mastermind\\nMarket Update",
  "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
  "snapshot": [
    {{"label": "BTC", "value": "+X%"}},
    {{"label": "ETH", "value": "+X%"}},
    {{"label": "Volatility", "value": "short phrase"}},
    {{"label": "ETH Gas", "value": "~$X.XX"}}
  ],
  "intro": "2-3 sentence macro framing for LPs",
  "stories": [
    {{
      "title": "Story title",
      "body": "3-4 sentences on what happened and what it means for LPs",
      "spark": "Discussion question for the LP group"
    }}
  ],
  "closing": "1-2 sentence closing prompt to the group"
}}

Rules:
- Include 4-5 stories drawn from the headlines above, focused on what matters for LP range management
- Use -- instead of em dashes
- Use straight quotes only
- No markdown in any values
- Fill in the snapshot values using the price data provided; estimate gas if not available
- Return ONLY the JSON object, nothing else"""


def call_claude(prompt):
    result = subprocess.run(
        ["claude", "-p", prompt],
        capture_output=True,
        text=True,
        timeout=420,
    )
    print(f"Claude returncode: {result.returncode}, stdout_len: {len(result.stdout)}")
    if result.stderr:
        print(f"Claude stderr: {result.stderr[:500]}")
    if result.returncode != 0:
        detail = result.stderr.strip() or result.stdout.strip() or f"exit {result.returncode}"
        raise RuntimeError(f"Claude CLI exit {result.returncode}: {detail[:500]}")

    raw = result.stdout.strip()
    if not raw:
        print(f"Claude returned empty output. stderr: {result.stderr[:500]}")
        raise RuntimeError("Claude returned empty output")
    if raw.startswith("```"):
        lines = raw.split("\n")
        raw = "\n".join(lines[1:-1] if lines[-1].startswith("```") else lines[1:])
    return json.loads(raw)


def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            return json.load(f)
    return {}


def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


SLACK_CHANNEL_ID = "C0ATN065QQ3"


def _post_slack(token, text, thread_ts=None):
    payload = {"channel": SLACK_CHANNEL_ID, "text": text}
    if thread_ts:
        payload["thread_ts"] = thread_ts
    resp = requests.post(
        "https://slack.com/api/chat.postMessage",
        headers={"Authorization": f"Bearer {token}"},
        json=payload,
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    if not data.get("ok"):
        raise RuntimeError(f"Slack error: {data.get('error')}")
    return data["ts"]


def send_to_slack(digest, token):
    # Thread root: short, always under the size limit, contains the publish prompt.
    snapshot_lines = "\n".join(
        f"• *{item.get('label', '')}*: {item.get('value', '')}"
        for item in digest.get("snapshot", [])
    )
    snapshot_block = f"*Snapshot*\n{snapshot_lines}\n\n" if snapshot_lines else ""
    root_text = (
        f"*{digest['title'].replace(chr(10), ' ')}* -- {digest['date']}\n"
        f"_{digest['subtitle']}_\n\n"
        f"{snapshot_block}"
        f"{digest['intro']}\n\n"
        f"_Full article is in the thread below. Reply in the thread with *publish* when you're ready to ship, or ask me anything there._"
    )
    thread_ts = _post_slack(token, root_text)

    # Each story as its own threaded reply for clean scanning.
    for s in digest.get("stories", []):
        story_text = f"*{s['title']}*\n{s['body']}\n_Spark: {s['spark']}_"
        _post_slack(token, story_text, thread_ts=thread_ts)

    # Closing as the final threaded reply.
    if digest.get("closing"):
        _post_slack(token, f"*Closing:* {digest['closing']}", thread_ts=thread_ts)

    return thread_ts


def read_existing_digests():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE) as f:
        content = f.read()
    start = content.index("[")
    end = content.rindex("]") + 1
    return json.loads(content[start:end])


def write_data_js(digest):
    digests = read_existing_digests()
    # Remove existing entry with same id if present, then prepend
    digests = [d for d in digests if d.get("id") != digest["id"]]
    digests.insert(0, digest)
    with open(DATA_FILE, "w") as f:
        f.write("// data.js — Patient Investor Digest\n")
        f.write("// Scheduled task prepends new issues to the TOP of this array automatically.\n")
        f.write("// Manual additions: follow the same object structure and add to the top.\n")
        f.write(f"const DIGESTS = {json.dumps(digests, indent=2)};\n")


def git_commit(message):
    os.system(f'git config user.email "actions@github.com"')
    os.system(f'git config user.name "GitHub Actions"')
    os.system(f"git add {DATA_FILE} {STATE_FILE}")
    os.system(f'git commit -m "{message}"')
    os.system("git pull --rebase")
    os.system("git push")


def main():
    today = datetime.now(timezone.utc).strftime("%B %d, %Y")
    print(f"Generating digest for {today}...")

    prices = fetch_prices()
    articles = fetch_rss_headlines()
    print(f"Fetched {len(articles)} headlines")

    prompt = build_prompt(today, prices, articles)
    print("Calling Claude...")
    digest = call_claude(prompt)
    print(f"Generated digest: {digest['id']}")

    slack_token = os.environ.get("SLACK_BOT_TOKEN", "")
    ts = None
    if slack_token:
        ts = send_to_slack(digest, slack_token)
        print(f"Sent to Slack, ts={ts}")
    else:
        print("Warning: SLACK_BOT_TOKEN not set, skipping Slack send", file=sys.stderr)

    state = load_state()
    state["pending"] = {
        "digest": digest,
        "slack_ts": ts,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    save_state(state)

    write_data_js(digest)
    git_commit(f"Add digest {digest['id']} (pending publish approval)")
    print("Done.")


if __name__ == "__main__":
    main()
