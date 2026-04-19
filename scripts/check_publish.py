import argparse
import json
import os
import subprocess
import sys

import requests

SLACK_CHANNEL_ID = "C0ATN065QQ3"
STATE_FILE = "scripts/.digest_state.json"
DATA_FILE = "data.js"
THREAD_CONTEXT_LIMIT = 12  # number of prior thread messages to include as context


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


def build_thread_context(messages, latest_ts):
    """Return recent thread messages (excluding the message we're responding to)."""
    context = []
    for m in messages:
        if m.get("ts") == latest_ts:
            continue
        role = "Assistant" if m.get("bot_id") else "Gregory"
        text = (m.get("text") or "").strip()
        if not text:
            continue
        context.append(f"{role}: {text}")
    return context[-THREAD_CONTEXT_LIMIT:]


def process_message(digest, thread_context, latest_message):
    prompt = f"""You are Gregory's editorial collaborator for the Patient Investor LP Mastermind digest, working with him inside a Slack thread. You have full creative and analytical latitude -- discuss, brainstorm, explain, critique, rewrite, or just chat. Respond like a sharp colleague, not a form-filling bot.

The Mastermind audience is experienced DeFi LPs running concentrated liquidity on Uniswap V3/V4 -- they understand impermanent loss, tick ranges, fee tiers, rebalancing, and on-chain mechanics. Some run tight ranges (high fee capture, frequent rebalance), others run wider asymmetric ranges (more passive, vol-resilient).

Current digest (JSON):
{json.dumps(digest, indent=2)}

Recent thread conversation:
{chr(10).join(thread_context) if thread_context else "(no prior messages)"}

Gregory's latest message:
{latest_message}

Respond by returning ONLY a JSON object with this shape (no markdown fencing, no surrounding text):

{{
  "reply": "your Slack message to Gregory",
  "revised_digest": null OR the full updated digest as a JSON object,
  "publish": false OR true
}}

Field guidance:
- "reply" is always required. Put anything you want to say to Gregory here. This could be: answering a question, the complete digest formatted for readability, a critique, a suggestion, small talk, a single sentence -- whatever fits the request.
- "revised_digest" is ONLY populated when you're making an actual edit to the digest. When you do revise, apply only the change Gregory asked for (same id and date; leave other fields untouched unless he asked otherwise). Return the complete digest object. When no edit is intended, set this to null.
- "publish" is true ONLY when Gregory has clearly indicated he wants the current digest pushed to the site now (e.g. "publish", "ship it", "push to the site", "looks good let's go live"). Otherwise false.

Slack formatting for "reply": use *bold*, _italic_, and bullets with •. No markdown headers (#). Use -- instead of em dashes. Straight quotes only. Readable, conversational, no boilerplate. When Gregory asks to see the full article, format it nicely with the title, date, snapshot, intro, every story (title/body/spark), and closing -- make it pleasant to read in Slack.

Digest field rules (when revising): use -- instead of em dashes, straight quotes only, no markdown inside values."""

    result = subprocess.run(
        ["claude", "-p", prompt],
        capture_output=True,
        text=True,
        timeout=180,
    )
    print(f"Claude returncode: {result.returncode}, stdout_len: {len(result.stdout)}")
    if result.stderr:
        print(f"Claude stderr: {result.stderr[:500]}")
    if result.returncode != 0:
        detail = result.stderr.strip() or result.stdout.strip() or f"exit {result.returncode}"
        raise RuntimeError(f"Claude CLI exit {result.returncode}: {detail[:300]}")

    raw = result.stdout.strip()
    if not raw:
        raise RuntimeError("Claude returned empty output")
    if raw.startswith("```"):
        lines = raw.split("\n")
        raw = "\n".join(lines[1:-1] if lines[-1].startswith("```") else lines[1:])

    parsed = json.loads(raw)
    if not isinstance(parsed, dict) or "reply" not in parsed:
        raise RuntimeError("Claude response missing required 'reply' field")
    return parsed


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


def do_publish(token, thread_ts, state, pending, intro_message=None):
    if intro_message:
        post_reply(token, thread_ts, intro_message)
    write_data_js(pending["digest"])
    state["published"] = True
    save_state(state)
    git_commit(f"Publish digest {pending['digest']['id']}", include_data=True)
    post_reply(token, thread_ts, "Done! The digest is live at https://patient-investor-digest.pages.dev/")


def get_new_replies(token, state):
    pending = state.get("pending") or {}
    thread_ts = pending.get("slack_ts")
    if not thread_ts:
        return None, [], []
    last_processed_ts = pending.get("last_processed_ts", thread_ts)
    messages = get_replies(token, SLACK_CHANNEL_ID, thread_ts)
    new_replies = [
        m for m in messages[1:]
        if float(m["ts"]) > float(last_processed_ts)
        and not m.get("bot_id")
        and m.get("subtype") not in ("bot_message", "bot_add", "channel_join")
    ]
    return thread_ts, new_replies, messages


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
        _, new_replies, _ = get_new_replies(token, state)
    except Exception:
        print("nothing")
        return
    if not new_replies:
        print("nothing")
        return
    # Any non-empty reply now requires Claude to classify intent.
    print("feedback")


def mode_run():
    token = os.environ.get("SLACK_BOT_TOKEN", "")
    if not token:
        print("SLACK_BOT_TOKEN not set, exiting.")
        sys.exit(1)

    state = load_state()
    if not state or not state.get("pending") or state.get("published"):
        print("Nothing pending.")
        return

    pending = state["pending"]
    thread_ts, new_replies, all_messages = get_new_replies(token, state)
    if not thread_ts or not new_replies:
        print("No new replies.")
        return

    state_dirty = False

    for reply in new_replies:
        text = (reply.get("text") or "").strip()
        ts = reply["ts"]
        pending["last_processed_ts"] = ts
        state_dirty = True

        # Quick-path publish (skip Claude round-trip on exact match)
        if text.lower() == "publish":
            print("Publish quick-path.")
            do_publish(token, thread_ts, state, pending, intro_message="Publishing now -- give it a moment for the site to update.")
            return

        if not text:
            continue

        thread_context = build_thread_context(all_messages, ts)
        print(f"Processing message: {text[:100]}")

        try:
            decision = process_message(pending["digest"], thread_context, text)
        except subprocess.TimeoutExpired:
            post_reply(token, thread_ts, "Claude timed out (>3 min). Try again or break the request into smaller pieces.")
            save_state(state)
            continue
        except json.JSONDecodeError as e:
            post_reply(token, thread_ts, f"Claude returned invalid JSON ({str(e)[:100]}). Try rewording.")
            save_state(state)
            continue
        except RuntimeError as e:
            post_reply(token, thread_ts, f"Error: {str(e)[:300]}")
            save_state(state)
            continue
        except Exception as e:
            post_reply(token, thread_ts, f"Unexpected error: {type(e).__name__}: {str(e)[:200]}")
            save_state(state)
            continue

        reply_text = (decision.get("reply") or "").strip()
        revised = decision.get("revised_digest")
        should_publish = bool(decision.get("publish"))

        if reply_text:
            post_reply(token, thread_ts, reply_text)

        if isinstance(revised, dict) and "stories" in revised:
            pending["digest"] = revised
            save_state(state)
            post_reply(token, thread_ts, "_Digest updated. Reply *publish* when you're ready to ship it._")

        if should_publish:
            # reply_text already posted above; don't duplicate it
            do_publish(token, thread_ts, state, pending)
            return

        save_state(state)

    if state_dirty:
        git_commit("Update digest state after thread activity", include_data=False)


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
