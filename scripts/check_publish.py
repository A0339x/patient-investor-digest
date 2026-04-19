import argparse
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
    prompt = f"""You are making targeted edits to a digest for the Patient Investor LP Mastermind community -- experienced DeFi LPs managing concentrated liquidity on Uniswap V3/V4.

Here is the current digest as JSON:
{json.dumps(digest, indent=2)}

Here is the editor's feedback:
{feedback}

IMPORTANT RULES:
- Only change the specific fields or stories the feedback refers to. Leave everything else completely untouched -- same wording, same structure, same order.
- If the feedback asks to modify a story, only edit that story's body and/or spark. Do not rename it, reorder it, or touch other stories.
- Do not rewrite the intro, closing, snapshot, title, or subtitle unless the feedback explicitly asks you to.
- Return the full digest as a valid JSON object only -- no markdown fencing, no explanation, just the raw JSON.
- Keep the same id and date. Use -- instead of em dashes, straight quotes only, no markdown in any values."""

    result = subprocess.run(
        ["claude", "-p", prompt],
        capture_output=True,
        text=True,
        timeout=180,
    )
    print(f"Claude returncode: {result.returncode}")
    print(f"Claude stdout length: {len(result.stdout)}")
    if result.stderr:
        print(f"Claude stderr: {result.stderr[:500]}")
    if result.returncode != 0:
        detail = result.stderr.strip() or result.stdout.strip() or f"exit code {result.returncode}"
        raise RuntimeError(f"Claude CLI exit {result.returncode}: {detail[:300]}")
    raw = result.stdout.strip()
    if not raw:
        raise RuntimeError("Claude returned empty output")
    # Strip possible markdown fencing just in case
    if raw.startswith("```"):
        lines = raw.split("\n")
        raw = "\n".join(lines[1:-1] if lines[-1].startswith("```") else lines[1:])
    return json.loads(raw)


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
    os.system("git pull --rebase")
    os.system("git push")


def get_new_replies(token, state):
    pending = state.get("pending") or {}
    thread_ts = pending.get("slack_ts")
    if not thread_ts:
        return None, []
    last_processed_ts = pending.get("last_processed_ts", thread_ts)
    messages = get_replies(token, SLACK_CHANNEL_ID, thread_ts)
    new_replies = [
        m for m in messages[1:]
        if float(m["ts"]) > float(last_processed_ts)
        and not m.get("bot_id")
        and m.get("subtype") not in ("bot_message", "bot_add", "channel_join")
    ]
    return thread_ts, new_replies


def determine_status(new_replies):
    if not new_replies:
        return "nothing"
    for r in new_replies:
        if r.get("text", "").strip().lower() != "publish":
            return "feedback"
    return "publish"


def mode_check():
    token = os.environ.get("SLACK_BOT_TOKEN", "")
    if not token:
        print("nothing")
        return
    state = load_state()
    if not state or not state.get("pending") or state.get("published"):
        print("nothing")
        return
    try:
        _, new_replies = get_new_replies(token, state)
    except Exception:
        print("nothing")
        return
    print(determine_status(new_replies))


def mode_run():
    token = os.environ.get("SLACK_BOT_TOKEN", "")
    if not token:
        print("SLACK_BOT_TOKEN not set, exiting.")
        sys.exit(1)

    state = load_state()
    if not state:
        print("No state file, nothing to do.")
        return

    pending = state.get("pending")
    if not pending:
        print("No pending digest.")
        return

    if state.get("published"):
        print("Already published.")
        return

    thread_ts, new_replies = get_new_replies(token, state)
    if not thread_ts:
        print("No slack_ts in state.")
        return

    if not new_replies:
        print("No new replies.")
        return

    state_dirty = False

    for reply in new_replies:
        text = reply.get("text", "").strip()
        ts = reply["ts"]
        pending["last_processed_ts"] = ts
        state_dirty = True

        if text.lower() == "publish":
            print("Publish signal found.")
            post_reply(token, thread_ts, "Publishing now -- give it a moment for the site to update.")
            write_data_js(pending["digest"])
            state["published"] = True
            save_state(state)
            git_commit(f"Publish digest {pending['digest']['id']}", include_data=True)
            post_reply(token, thread_ts, "Done! The digest is live at https://patient-investor-digest.pages.dev/")
            return

        print(f"Feedback received: {text[:80]}")
        post_reply(token, thread_ts, "Got it -- sending this for rewriting now...")

        try:
            revised = revise_digest(pending["digest"], text)
        except subprocess.TimeoutExpired:
            post_reply(token, thread_ts, "Claude timed out (>3 min). Try again or break the feedback into smaller pieces.")
            save_state(state)
            continue
        except json.JSONDecodeError as e:
            post_reply(token, thread_ts, f"Claude returned something that wasn't valid JSON ({str(e)[:100]}). Try rewording the feedback.")
            save_state(state)
            continue
        except RuntimeError as e:
            post_reply(token, thread_ts, f"Revision failed: {str(e)[:300]}")
            save_state(state)
            continue
        except Exception as e:
            post_reply(token, thread_ts, f"Unexpected error: {type(e).__name__}: {str(e)[:200]}")
            save_state(state)
            continue

        pending["digest"] = revised
        save_state(state)
        post_reply(token, thread_ts, format_preview(revised))

    if state_dirty:
        git_commit("Update digest state after feedback", include_data=False)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["check", "run"], default="run")
    args = parser.parse_args()

    if args.mode == "check":
        mode_check()
    else:
        mode_run()


if __name__ == "__main__":
    main()
