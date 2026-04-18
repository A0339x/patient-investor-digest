import json
import os
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


def git_commit(message):
    os.system('git config user.email "actions@github.com"')
    os.system('git config user.name "GitHub Actions"')
    os.system(f"git add {DATA_FILE} {STATE_FILE}")
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

    print(f"Checking replies on thread {thread_ts}...")
    messages = get_replies(token, SLACK_CHANNEL_ID, thread_ts)

    publish_found = any(
        "publish" in msg.get("text", "").lower()
        for msg in messages[1:]  # skip the original message
    )

    if not publish_found:
        print("No 'publish' reply found yet.")
        sys.exit(0)

    print("Publish signal found! Updating site...")
    digest = pending["digest"]
    write_data_js(digest)

    state["published"] = True
    save_state(state)

    git_commit(f"Publish digest {digest['id']}")
    print("Done.")


if __name__ == "__main__":
    main()
