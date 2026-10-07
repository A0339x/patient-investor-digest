"""Tell the members platform about an issue ahead of its 9am go-live so it can
schedule the notification and the featured-spark tap page.

FAIL-SOFT: the issue is already pushed by the time this runs, so a platform
outage must never fail the run. If the env vars are unset or every attempt
fails we log a WARNING and return. stdlib only (no new deps)."""

import json
import os
import re
import time
import urllib.error
import urllib.request

ATTEMPTS = 3
BACKOFF_SECONDS = (2, 5)  # sleep before attempt 2 and attempt 3
TIMEOUT_SECONDS = 30
QUESTION_FETCH_TIMEOUT = 15
MEMBER_QUESTION_MAX = 600
_UUID_RE = re.compile(
    r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", re.IGNORECASE)


def fetch_member_question():
    """The member-submitted question the group voted for, or None.

    GETs DIGEST_NEXT_QUESTION_URL (Bearer DIGEST_WEBHOOK_SECRET); the platform
    answers {"question": {"id": "<uuid>", "body": "<text>"}} or {"question": null}.
    FAIL-SOFT: an unset env var, any error, a non-200, bad JSON or a malformed
    question returns None (and logs one line) so the issue is simply generated
    the ordinary way. The body is untrusted member text: callers treat it as data."""
    try:
        url = os.environ.get("DIGEST_NEXT_QUESTION_URL", "")
        secret = os.environ.get("DIGEST_WEBHOOK_SECRET", "")
        if not url or not secret:
            print("fetch_member_question: DIGEST_NEXT_QUESTION_URL / DIGEST_WEBHOOK_SECRET "
                  "not set, no member question.")
            return None
        req = urllib.request.Request(
            url, headers={"Authorization": f"Bearer {secret}"}, method="GET")
        with urllib.request.urlopen(req, timeout=QUESTION_FETCH_TIMEOUT) as resp:
            if resp.status != 200:
                print(f"fetch_member_question: HTTP {resp.status}, no member question.")
                return None
            data = json.loads(resp.read().decode("utf-8"))
        q = data.get("question") if isinstance(data, dict) else None
        if q is None:
            print("fetch_member_question: no question this week.")
            return None
        qid = q.get("id") if isinstance(q, dict) else None
        body = q.get("body") if isinstance(q, dict) else None
        if (not isinstance(qid, str) or not _UUID_RE.match(qid)
                or not isinstance(body, str) or not body.strip()
                or len(body) > MEMBER_QUESTION_MAX):
            print("fetch_member_question: question failed validation, ignoring it.")
            return None
        print(f"fetch_member_question: got question {qid} ({len(body)} chars).")
        return {"id": qid, "body": body.strip()}
    except urllib.error.HTTPError as e:
        print(f"fetch_member_question: HTTP {e.code}, no member question.")
    except Exception as e:  # never fail the run over an optional input
        print(f"fetch_member_question: {type(e).__name__}: {e}, no member question.")
    return None


def build_payload(digest):
    """The staging contract the platform expects. `featured_source` says whether
    the featured spark came from a member's question; the generator stamps the
    private `_memberQuestionId` on the digest only when it was used."""
    featured = digest.get("featured") or None
    from_member = bool(featured and featured.get("fromMember") is True)
    payload = {
        "digest_id": digest["id"],
        "date": digest.get("date", ""),
        "title": (digest.get("title") or "").replace("\n", " ").strip(),
        "subtitle": digest.get("subtitle", ""),
        "intro": digest.get("intro", ""),
        "publish_at": digest.get("publishAt"),
        "snapshot": digest.get("snapshot", []),
        "stories": [
            {"index": i, "title": s.get("title", ""), "body": s.get("body", ""), "spark": s.get("spark", "")}
            for i, s in enumerate(digest.get("stories", []))
        ],
        "closing": digest.get("closing", ""),
        "featured": featured,
        "featured_source": "member" if from_member else "generator",
    }
    if from_member and digest.get("_memberQuestionId"):
        payload["member_question_id"] = digest["_memberQuestionId"]
    return payload


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
