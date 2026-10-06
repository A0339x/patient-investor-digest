import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone

import feedparser
import requests

from digest_rules import (
    VARIABLES,
    is_featured_problem,
    publish_at_iso,
    target_issue,
    validate_digest,
)
from platform_notify import stage_issue

RSS_FEEDS = [
    "https://www.theblock.co/rss.xml",
    "https://decrypt.co/feed",
    "https://cryptopanic.com/news/defi/rss/",
    "https://cryptopanic.com/news/ethereum/rss/",
]

STATE_FILE = "scripts/.digest_state.json"
DATA_FILE = "data.js"

CONTEXT_DIR = "digest_context"
CONTEXT_FILES = {
    "variables_reference": "Patient Investor Digest - Variables Reference.md",
    "variable_pairings": "Patient Investor Digest - Variable Pairings.md",
    "style_guide": "LP_DIGEST_STYLE_GUIDE.md",
}


def load_editorial_context():
    """Read the editorial context files staged into digest_context/.

    These files are synced from the parent folder via scripts/sync_digest_context.sh.
    If any file is missing, return an empty string for it and log a warning --
    the prompt will still build, just without that piece of guidance.
    """
    out = {}
    for key, filename in CONTEXT_FILES.items():
        path = os.path.join(CONTEXT_DIR, filename)
        try:
            with open(path, encoding="utf-8") as f:
                out[key] = f.read().strip()
        except FileNotFoundError:
            print(f"Warning: editorial context file missing: {path}", file=sys.stderr)
            out[key] = ""
    return out


COINGECKO = "https://api.coingecko.com/api/v3"


def _fetch_prices_7d():
    """7-day change via /coins/markets. Raises if either coin or its 7d field is
    missing so the caller can fall back to the 24h endpoint."""
    resp = requests.get(
        f"{COINGECKO}/coins/markets",
        params={"vs_currency": "usd", "ids": "bitcoin,ethereum", "price_change_percentage": "7d"},
        timeout=10,
    )
    resp.raise_for_status()
    rows = {r["id"]: r for r in resp.json()}
    btc, eth = rows["bitcoin"], rows["ethereum"]
    out = {
        "btc_price": btc["current_price"],
        "btc_change": btc["price_change_percentage_7d_in_currency"],
        "eth_price": eth["current_price"],
        "eth_change": eth["price_change_percentage_7d_in_currency"],
        "window": "7d",
    }
    if out["btc_change"] is None or out["eth_change"] is None:
        raise KeyError("price_change_percentage_7d_in_currency")
    return out


def _fetch_prices_24h():
    resp = requests.get(
        f"{COINGECKO}/simple/price",
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
        "window": "24h",
    }


def fetch_prices():
    """Weekly issue, so prefer the 7-day change; fall back to 24h (labeled as
    such in the prompt) and finally to N/A rather than failing the run."""
    try:
        return _fetch_prices_7d()
    except Exception as e:
        print(f"Warning: could not fetch 7d prices ({e}); falling back to 24h", file=sys.stderr)
    try:
        return _fetch_prices_24h()
    except Exception as e:
        print(f"Warning: could not fetch prices: {e}", file=sys.stderr)
        return {"btc_price": "N/A", "btc_change": 0, "eth_price": "N/A", "eth_change": 0, "window": "N/A"}


def _fmt_price_line(label, price, change, window):
    """One 'BTC: $85,800 (+1.2% 7d)' line; tolerates the N/A fallback values."""
    if isinstance(price, (int, float)):
        price_str = f"${price:,}"
        sign = "+" if change >= 0 else ""
        return f"{label}: {price_str} ({sign}{change:.1f}% {window})"
    return f"{label}: price unavailable"


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


def build_prompt(today, today_id, prices, articles, context):
    """`today` / `today_id` are the TARGET Monday's date strings (the issue is
    drafted shortly before it goes live), not the wall-clock day of the run."""
    articles_text = "\n".join(
        f"- [{a['source']}] {a['title']}: {a['summary']}" for a in articles
    )
    window = prices.get("window", "24h")
    btc_line = _fmt_price_line("BTC", prices["btc_price"], prices["btc_change"], window)
    eth_line = _fmt_price_line("ETH", prices["eth_price"], prices["eth_change"], window)
    variables_list = ", ".join(VARIABLES)
    if window == "N/A":
        price_note = "Price data is unavailable this week; describe the snapshot qualitatively rather than inventing numbers."
    else:
        price_note = (f"The percentage changes above are {window} changes. The BTC and ETH snapshot "
                      f"values must be these {window} changes -- do not describe them as daily moves.")

    editorial_block = f"""=== EDITORIAL CONTEXT (treat as authoritative) ===

The three documents below are the editorial system for this digest. They
define the vocabulary you must reinforce, the audience you're writing for,
and the prose patterns and anti-patterns the editor has built up over time.
Read them carefully before drafting. They override anything else in this
prompt if there is a conflict.

--- VARIABLES REFERENCE (the six variables we teach) ---
The digest exists to compound members' knowledge of these six variables.
When a story relates to one of them, name the variable explicitly in the
prose and use it as the teaching hook. Don't gesture at it -- name it.

{context.get('variables_reference', '(missing)')}

--- STYLE GUIDE (audience, structure, tone) ---
{context.get('style_guide', '(missing)')}

--- VARIABLE PAIRINGS (the learning loop -- house voice + anti-patterns) ---
This is the most important file. It documents which variable belongs with
which kind of news, the prose patterns that have worked, and the voice /
framing notes that apply to every article. Match the voice in the examples.

{context.get('variable_pairings', '(missing)')}

=== END EDITORIAL CONTEXT ===
"""

    return f"""This issue is dated {today} and goes live that Monday at 9:00am Pacific. You are drafting it just before then.

{btc_line}
{eth_line}
{price_note}

Recent crypto news headlines:
{articles_text}

{editorial_block}

You are writing a digest for the Patient Investor LP Mastermind. Members are early in their LP journey -- they know how to rebalance positions on Uniswap V3/V4 and understand the basics, but they're still learning the cause-and-effect: why a skewed range captures more appreciation than a centered one, when widening beats rebalancing, how range width affects fee capture in volatile pairs. This digest is a teaching tool, not a power-user newsletter. Each story should be a small learning moment -- explain what happened in plain language, then unpack what it means for how they set up and manage their ranges. If you use a technical term (tick spacing, JIT, MEV, LRT, oracle depeg, etc.), briefly define it inline the first time it appears in that issue (em-dash-flanked parenthetical is the house pattern, see Variable Pairings). Prefer concrete examples ("if your range is $3,000-$3,500 and ETH drops to $2,800...") over abstractions. The spark question should open a door to deeper understanding a thoughtful beginner can reflect on -- not a debate topic for veterans.

The verb posture for every article is *implement or modify* -- push the reader toward a concrete tweak they could make to their range Monday morning, not just an explanation of what happened. When a story matches one of the six variables, name the variable explicitly. Look for the non-obvious second variable too (see the KelpDAO entry in Variable Pairings for the pattern).

Do NOT mention "impermanent loss" or the abbreviation "IL" anywhere in the digest. Talk about range mechanics, fee capture, price exposure, or asset composition directly -- never by that label.

Return ONLY a valid JSON object with no markdown fencing, no explanation, no commentary -- just the raw JSON.

Required structure (use the exact id and date values shown below -- do not change them to any other day):
{{
  "id": "{today_id}",
  "date": "{today}",
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
  "featured": {{
    "storyIndex": 0,
    "question": "The featured spark question",
    "choices": ["Option A", "Option B"],
    "variable": "Range",
    "workedAnswer": "One way to think about it"
  }},
  "closing": "1-2 sentence closing prompt to the group"
}}

The "featured" object is this week's one spark that members answer with a single tap on a companion page, so it is written differently from the ordinary story sparks:
- storyIndex is the 0-based index of the story in "stories" that the featured spark belongs to. Exactly one story is featured; every other story keeps an ordinary discussion spark exactly as described above.
- The featured spark must be a real decision between named options a thoughtful beginner could weigh (for example: "skew the range or move to a correlated pair?"). If no story this week supports a decision like that, make it a "go look at one of your pools and report which bucket it falls in" question instead, with the buckets as the choices, and attach it to the story that fits best.
- question: 220 characters or fewer. It must be understandable WITHOUT reading the story: one clause of context, then the decision.
- choices: 2 to 4 options, each 48 characters or fewer, mutually exclusive. Do NOT add an "it depends" or "other" choice -- the platform adds that itself.
- variable: exactly one of {variables_list}. This is the variable the decision mostly turns on.
- workedAnswer: 3-5 sentences, framed as one way to think about it. It names what the decision depends on using the six-variable vocabulary, and it does NOT declare any one choice the winner. No buy or sell instruction and no price prediction.
- Everything in "featured" obeys the same style rules below (no "impermanent loss" or "IL", -- instead of em dashes, straight quotes, no markdown).

Rules:
- Include 4-5 stories drawn from the headlines above, focused on what matters for LP range management
- Use -- instead of em dashes
- Use straight quotes only
- No markdown in any values
- Fill in the snapshot values using the price data provided (the {window} changes); estimate gas if not available
- Return ONLY the JSON object, nothing else"""


def _extract_json(raw):
    """Pull the JSON object out of Claude's reply, tolerating code fences or
    surrounding prose. The model occasionally wraps the JSON in ```json fences
    or prefixes a sentence ("Here's the digest:"), which made a naive
    json.loads() fail at char 0 -- the cause of the 2026-06-08 missed digest."""
    raw = raw.strip()
    # Prefer a fenced ```json ... ``` block if one is present anywhere.
    m = re.search(r"```(?:json)?\s*(\{.*\})\s*```", raw, re.DOTALL)
    if m:
        return m.group(1)
    # Otherwise take the outermost {...} span, ignoring any surrounding prose.
    start, end = raw.find("{"), raw.rfind("}")
    if start != -1 and end > start:
        return raw[start:end + 1]
    return raw


def _run_claude(prompt):
    """Invoke the Claude CLI once and return its stdout (stripped). Raises on a
    non-zero exit or empty output."""
    result = subprocess.run(
        ["claude", "-p", prompt],
        capture_output=True,
        text=True,
        timeout=900,
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
    return raw


# Appended to the prompt on a retry when the first reply couldn't be parsed.
_JSON_ONLY_NUDGE = (
    "\n\nIMPORTANT: your previous reply could not be parsed as JSON. Reply with "
    "ONLY the raw JSON object -- no markdown code fences, no commentary before or "
    "after it. Your reply must start with { and end with }."
)


def call_claude(prompt):
    """Run Claude and parse its JSON reply. If the first reply can't be parsed,
    retry once with a stricter JSON-only instruction before giving up. The happy
    path (first reply parses) returns immediately and is unchanged -- the retry
    only adds a self-heal for the rare unparseable reply (the 2026-06-08 failure
    mode that skipped that week's digest)."""
    attempts = [prompt, prompt + _JSON_ONLY_NUDGE]
    last_err = None
    for i, p in enumerate(attempts):
        if i:
            print(f"Retrying Claude with a stricter JSON-only instruction "
                  f"(attempt {i + 1}/{len(attempts)})...")
        raw = _run_claude(p)
        try:
            return json.loads(_extract_json(raw))
        except json.JSONDecodeError as e:
            last_err = e
            # Surface the raw output so the failure is diagnosable from the CI log.
            print(f"Could not parse Claude output as JSON ({e}). Raw output:\n{raw[:2000]}")
    raise RuntimeError(
        f"Claude output could not be parsed as JSON after {len(attempts)} "
        f"attempts: {last_err}")


# Appended when a parsed reply fails validate_digest(); the problem list follows.
_FIX_NUDGE = (
    "\n\nIMPORTANT: your previous reply was valid JSON but failed these checks. "
    "Return the full corrected JSON object with every problem fixed and nothing else "
    "changed for the worse:\n{problems}"
)

MAX_FIX_RETRIES = 2


def _stamp(digest, issue):
    """Force the fields the model must never decide: id, date and publishAt."""
    date_obj, issue_id, date_str = issue
    if isinstance(digest, dict):
        digest["id"] = issue_id
        digest["date"] = date_str
        digest["publishAt"] = publish_at_iso(date_obj)
    return digest


def generate_validated(prompt, issue):
    """call_claude() + validate_digest(), retrying up to MAX_FIX_RETRIES more
    times with the problem list appended. If only the featured spark is still
    broken afterwards, ship the issue without it; any other leftover problem
    raises so the run fails loudly."""
    problems = []
    for attempt in range(MAX_FIX_RETRIES + 1):
        p = prompt
        if problems:
            print(f"Retrying Claude to fix {len(problems)} problem(s) "
                  f"(retry {attempt}/{MAX_FIX_RETRIES})...")
            p = prompt + _FIX_NUDGE.format(problems="\n".join(f"- {x}" for x in problems))
        digest = _stamp(call_claude(p), issue)
        problems = validate_digest(digest)
        if not problems:
            return digest
        print("Validation problems:\n" + "\n".join(f"- {x}" for x in problems))

    if all(is_featured_problem(x) for x in problems):
        print("Warning: featured spark still invalid after retries; shipping without it.",
              file=sys.stderr)
        digest.pop("featured", None)
        return digest
    raise RuntimeError("Digest failed validation after retries:\n"
                       + "\n".join(f"- {x}" for x in problems))


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

# Slack copy -- adjust the wording here.
SLACK_ROOT_FOOTER = (
    "_Goes live on its own Monday at 9:00am Pacific. Full article is in the thread below. "
    "Reply in the thread if you want changes, then say *publish* to push your edits._"
)
# Placeholders: {story} 1-based story number, {question}, {choices} (bullet
# lines), {variable}, {answer}.
SLACK_FEATURED_TEMPLATE = (
    "*Featured spark* (story {story})\n"
    "{question}\n"
    "{choices}\n"
    "_Variable: {variable}_\n\n"
    "*One way to think about it:* {answer}"
)


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


def format_featured_slack(digest):
    """Slack text for the featured spark, or None when the issue has none."""
    f = digest.get("featured")
    if not isinstance(f, dict):
        return None
    return SLACK_FEATURED_TEMPLATE.format(
        story=f.get("storyIndex", 0) + 1,
        question=f.get("question", ""),
        choices="\n".join(f"• {c}" for c in f.get("choices", [])),
        variable=f.get("variable", ""),
        answer=f.get("workedAnswer", ""),
    )


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
        f"{SLACK_ROOT_FOOTER}"
    )
    thread_ts = _post_slack(token, root_text)

    # Each story as its own threaded reply for clean scanning.
    for s in digest.get("stories", []):
        story_text = f"*{s['title']}*\n{s['body']}\n_Spark: {s['spark']}_"
        _post_slack(token, story_text, thread_ts=thread_ts)

    # Featured spark (the tap-to-answer one), when the issue has it.
    featured_text = format_featured_slack(digest)
    if featured_text:
        _post_slack(token, featured_text, thread_ts=thread_ts)

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
    return os.system("git push") == 0


def _force():
    return os.environ.get("DIGEST_FORCE", "").strip().lower() in ("1", "true")


def main():
    now = datetime.now(timezone.utc)
    issue = target_issue(now)
    _, today_id, today = issue
    print(f"Generating digest for {today} (id: {today_id})...")

    # The cron fires several times before publish (GitHub can delay or drop
    # runs); once the issue exists the rest are no-ops.
    if not _force() and any(d.get("id") == today_id for d in read_existing_digests()):
        print(f"Issue {today_id} already exists in {DATA_FILE}; nothing to do "
              "(set DIGEST_FORCE=1 to regenerate).")
        return

    prices = fetch_prices()
    articles = fetch_rss_headlines()
    print(f"Fetched {len(articles)} headlines")

    context = load_editorial_context()
    loaded = [k for k, v in context.items() if v]
    print(f"Editorial context loaded: {loaded}")

    prompt = build_prompt(today, today_id, prices, articles, context)
    print("Calling Claude...")
    digest = generate_validated(prompt, issue)
    print(f"Generated digest: {digest['id']} (publishAt {digest['publishAt']}, "
          f"featured: {'yes' if digest.get('featured') else 'no'})")

    slack_token = os.environ.get("SLACK_BOT_TOKEN", "")
    ts = None
    if slack_token:
        ts = send_to_slack(digest, slack_token)
        print(f"Sent to Slack, ts={ts}")
    else:
        print("Warning: SLACK_BOT_TOKEN not set, skipping Slack send", file=sys.stderr)

    state = load_state() or {}
    state["pending"] = {
        "digest": digest,
        "slack_ts": ts,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    state.pop("published", None)
    save_state(state)

    write_data_js(digest)
    pushed = git_commit(f"Add digest {digest['id']} (pending publish approval)")
    if pushed:
        # Tell the members platform now so it can notify at 9am. Fail-soft.
        stage_issue(digest)
    else:
        print("Warning: git push failed; not telling the platform about the issue.",
              file=sys.stderr)
    print("Done.")


if __name__ == "__main__":
    main()
