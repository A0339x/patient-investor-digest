import json
import os
import subprocess
import sys

import requests

SLACK_CHANNEL_ID = "C0ATN065QQ3"
STATE_FILE = "scripts/.digest_state.json"
DATA_FILE = "data.js"


def load_state():
    if not os.path.exists(STATE_FILE):
        print("No state file found, nothing to check.")
        return None
    with open(STATE_FILE) as f:
        return json.load(f)


def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def get_replies(token, channel, thread_ts):
    resp = requests.get(
        "https://slack.com/api/conversations.replies",
        headers={"Authorization": f"Bearer {token}"},
        params={"channel": channel, "ts": thread_ts},
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    if not data.get("ok"):
        raise RuntimeError(f"Slack conversations.replies error: {data.get('error')}")
    return data.get("messages", [])


def post_reply(token, thread_ts, text):
    resp = requests.post(
        "https://slack.com/api/chat.postMessage",
        headers={"Authorization": f"Bearer {token}"},
        json={"channel": SLACK_CHANNEL_ID, "thread_ts": thread_ts, "text": text},
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    if not data.get("ok"):
        raise RuntimeError(f"Slack error: {data.get('error')}")


def revise_digest(digest, feedback):
    prompt = f"""You are revising a digest for the Patient Investor LP Mastermind community -- experienced DeFi LPs managing concentrated liquidity on Uniswap V3/V4.

Here is the current digest as JSON:
{json.dumps(digest, indent=2)}

Here is the editor's feedback:
{feedback}

Apply the feedback and return the revised digest as a valid JSON object only -- no markdown fencing, no explanation, just the raw JSON. Keep the same id and date unless instructed to change them. Use -- instead of em dashes, straight quotes only, no markdown in any values."""

    result = subprocess.run(
        ["claude", "-p", prompt],
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(result.stdout.strip())


def format_preview(digest):
    stories = "\n".join(f"  {i+1}. {s['title']}" for i, s in enumerate(digest["stories"]))
    return (
        f"*Revised digest -- {digest['date']}*\n\n"
        f"*Intro:* {digest['intro']}\n\n"
        f"*Stories:*\n{stories}\n\n"
        f"*Closing:* {digest['closing']}\n\n"
        f"Reply *publish* to push to the site, or send more feedback."
    )


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
    digests = [d for d in digests if d.get("id") != digest["id"]]
    digests.insert(0, digest)
    with open(DATA_FILE, "w") as f:
        f.write("// data.js — Patient Investor Digest\n")
        f.write("// Scheduled task prepends new issues to the TOP of this array automatically.\n")
        f.write("// Manual additions: follow the same object structure and add to the top.\n")
        f.write(f"const DIGESTS = {json.dumps(digests, indent=2)};\n")


def git_commit(message, include_data=False):
    os.system('git config user.email "actions@github.com"')
    os.system('git config user.name "GitHub Actions"')
    files = f"{STATE_FILE} {DATA_FILE}" if include_data else STATE_FILE
    os.system(f"git add {files}")
    os.system(f'git commit -m "{message}"')
    os.system("git push")


def main():
    token = os.environ.get("SLACK_BOT_TOKEN", "")
    if not token:
        print("SLACK_BOT_TOKEN not set, exiting.")
        sys.exit(1)

    state = load_state()
    if not state:
        sys.exit(0)

    pending = state.get("pending")
    if not pending:
        print("No pending digest, nothing to check.")
        sys.exit(0)

    if state.get("published"):
        print("Already published, nothing to do.")
        sys.exit(0)

    thread_ts = pending.get("slack_ts")
    if not thread_ts:
        print("No slack_ts in state, cannot check replies.")
        sys.exit(0)

    messages = get_replies(token, SLACK_CHANNEL_ID, thread_ts)
    last_processed_ts = pending.get("last_processed_ts", thread_ts)

    new_replies = [
        m for m in messages[1:]
        if float(m["ts"]) > float(last_processed_ts)
    ]

    if not new_replies:
        print("No new replies.")
        sys.exit(0)

    for reply in new_replies:
        text = reply.get("text", "").strip()
        ts = reply["ts"]
        pending["last_processed_ts"] = ts

        if text.lower() == "publish":
            print("Publish signal found! Updating site...")
            write_data_js(pending["digest"])
            state["published"] = True
            save_state(state)
            git_commit(f"Publish digest {pending['digest']['id']}", include_data=True)
            print("Done.")
            sys.exit(0)
        else:
            print(f"Feedback received: {text[:80]}")
            revised = revise_digest(pending["digest"], text)
            pending["digest"] = revised
            save_state(state)
            post_reply(token, thread_ts, format_preview(revised))
            print("Posted revised preview to thread.")

    # Commit updated state (last_processed_ts + any revisions)
    git_commit(f"Update digest state after feedback", include_data=False)


if __name__ == "__main__":
    main()
