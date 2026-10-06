"""Tell the members platform about an issue ahead of its 9am go-live so it can
schedule the notification and the featured-spark tap page.

FAIL-SOFT: the issue is already pushed by the time this runs, so a platform
outage must never fail the run. If the env vars are unset or every attempt
fails we log a WARNING and return. stdlib only (no new deps)."""

import json
import os
import time
import urllib.error
import urllib.request

ATTEMPTS = 3
BACKOFF_SECONDS = (2, 5)  # sleep before attempt 2 and attempt 3
TIMEOUT_SECONDS = 30


def build_payload(digest):
    """The staging contract the platform expects."""
    return {
        "digest_id": digest["id"],
        "date": digest.get("date", ""),
        "title": (digest.get("title") or "").replace("\n", " ").strip(),
        "subtitle": digest.get("subtitle", ""),
        "intro": digest.get("intro", ""),
        "publish_at": digest.get("publishAt"),
        "snapshot": digest.get("snapshot", []),
        "stories": [
            {"index": i, "title": s.get("title", ""), "spark": s.get("spark", "")}
            for i, s in enumerate(digest.get("stories", []))
        ],
        "closing": digest.get("closing", ""),
        "featured": digest.get("featured") or None,
    }


def stage_issue(digest):
    """POST the issue to DIGEST_STAGE_WEBHOOK_URL. Never raises."""
    try:
        url = os.environ.get("DIGEST_STAGE_WEBHOOK_URL", "")
        secret = os.environ.get("DIGEST_WEBHOOK_SECRET", "")
        if not url or not secret:
            print("stage_issue: DIGEST_STAGE_WEBHOOK_URL / DIGEST_WEBHOOK_SECRET "
                  "not set, skipping platform notification.")
            return False

        body = json.dumps(build_payload(digest)).encode("utf-8")
        last = "unknown error"
        for attempt in range(1, ATTEMPTS + 1):
            req = urllib.request.Request(
                url,
                data=body,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {secret}",
                },
                method="POST",
            )
            retry = True
            try:
                with urllib.request.urlopen(req, timeout=TIMEOUT_SECONDS) as resp:
                    print(f"stage_issue: {resp.status} for digest {digest['id']}")
                    return True
            except urllib.error.HTTPError as e:
                last = f"HTTP {e.code} {e.read()[:200]!r}"
                # A client error (other than timeout / rate limit) won't fix itself.
                retry = e.code in (408, 429) or e.code >= 500
            except Exception as e:
                last = f"{type(e).__name__}: {e}"
            if not retry:
                break
            if attempt < ATTEMPTS:
                time.sleep(BACKOFF_SECONDS[min(attempt - 1, len(BACKOFF_SECONDS) - 1)])
        print(f"WARNING stage_issue: gave up on digest {digest.get('id')}: {last} "
              "(continuing; the issue is already pushed)")
    except Exception as e:  # even a malformed digest must not fail the run
        print(f"WARNING stage_issue: {type(e).__name__}: {e} (continuing)")
    return False
