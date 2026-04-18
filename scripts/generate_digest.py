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

You are writing a digest for the Patient Investor LP Mastermind community -- experienced DeFi liquidity providers managing concentrated liquidity positions on Uniswap V3 and V4. This audience understands impermanent loss, tick ranges, fee tiers, rebalancing strategy, and on-chain mechanics deeply.

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
        check=True,
    )
    raw = result.stdout.strip()
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


SLACK_CHANNEL_ID = "C085KR7NZK2"


def send_to_slack(digest, token):
    text = (
        f"*{digest['title'].replace(chr(10), ' ')}* -- {digest['date']}\n"
        f"{digest['subtitle']}\n\n"
        f"{digest['intro']}\n\n"
        + "\n\n".join(
            f"*{s['title']}*\n{s['body']}\n_Spark: {s['spark']}_"
            for s in digest["stories"]
        )
        + f"\n\n{digest['closing']}\n\nReply *publish* to push this to the site."
    )

    resp = requests.post(
        "https://slack.com/api/chat.postMessage",
        headers={"Authorization": f"Bearer {token}"},
        json={"channel": SLACK_CHANNEL_ID, "text": text},
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    if not data.get("ok"):
        raise RuntimeError(f"Slack error: {data.get('error')}")
    return data["ts"]


def write_data_js(digest):
    with open(DATA_FILE, "w") as f:
        f.write(f"const digestData = {json.dumps(digest, indent=2)};\n")


def git_commit(message):
    os.system(f'git config user.email "actions@github.com"')
    os.system(f'git config user.name "GitHub Actions"')
    os.system(f"git add {DATA_FILE} {STATE_FILE}")
    os.system(f'git commit -m "{message}"')
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
