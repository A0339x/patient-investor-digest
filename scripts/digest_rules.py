"""Pure, dependency-free rules shared by the generator, the Slack poller and the
tests: which Monday an issue targets, when it goes live, and whether a digest
object is fit to ship. stdlib only, so the poller (which installs just
`requests`) and a bare `python3 scripts/test_generate.py` can import it."""

import re
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

PACIFIC = ZoneInfo("America/Los_Angeles")
PUBLISH_HOUR = 9  # issues go live Monday 9:00am Pacific

VARIABLES = ["TVL", "Volume", "Average Volume", "Asset Selection", "Correlation", "Range"]

REQUIRED_KEYS = ["id", "date", "title", "subtitle", "snapshot", "intro", "stories", "closing"]
QUESTION_MAX = 220
CHOICE_MAX = 48
SKIPPED_MAX = 300

# Standalone "IL" is case-sensitive on purpose ("il" appears inside real words
# and names); "impermanent loss" is matched case-insensitively.
_BANNED = [
    ("impermanent loss", re.compile(r"impermanent\s+loss", re.IGNORECASE)),
    ("IL", re.compile(r"\bIL\b")),
]
_CURLY_QUOTES = "‘’“”"
_EM_DASH = "—"


def target_issue(now_utc):
    """Return (date, id, date_str) for the issue a run at `now_utc` should
    produce: today if it's Monday in Pacific time, otherwise the next Monday.
    Computed in Pacific so a Sunday-evening run (already Monday in UTC) still
    targets the Monday that is about to start."""
    local = now_utc.astimezone(PACIFIC).date()
    d = local + timedelta(days=(7 - local.weekday()) % 7)  # Monday == weekday 0
    return d, d.strftime("%m-%d-%Y"), d.strftime("%B %d, %Y")


def publish_at_iso(date_obj):
    """9:00am Pacific on `date_obj` as ISO-8601 with the DST-correct offset."""
    return datetime(date_obj.year, date_obj.month, date_obj.day,
                    PUBLISH_HOUR, 0, tzinfo=PACIFIC).isoformat()


def _walk_strings(node, path):
    """Yield (path, string) for every string value in a nested structure."""
    if isinstance(node, str):
        yield path, node
    elif isinstance(node, dict):
        for k, v in node.items():
            yield from _walk_strings(v, f"{path}.{k}" if path else str(k))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from _walk_strings(v, f"{path}[{i}]")


def _nonempty_str(v):
    return isinstance(v, str) and bool(v.strip())


FEATURED_MISSING = "featured: missing or not an object"


def _validate_featured(f, story_count):
    if not isinstance(f, dict):
        return [FEATURED_MISSING]
    out = []
    from_member = f.get("fromMember")
    if "fromMember" in f and not isinstance(from_member, bool):
        out.append("featured.fromMember: must be true or false")
    skipped = f.get("memberQuestionSkipped")
    if "memberQuestionSkipped" in f and (not isinstance(skipped, str) or len(skipped) > SKIPPED_MAX):
        out.append(f"featured.memberQuestionSkipped: must be a string of {SKIPPED_MAX} chars or fewer")
    idx = f.get("storyIndex")
    if idx is None and from_member is True:
        pass  # a member's question is not tied to any story
    elif isinstance(idx, bool) or not isinstance(idx, int) or not 0 <= idx < story_count:
        suffix = " (null only when fromMember is true)" if idx is None else ""
        out.append(f"featured.storyIndex: must be an integer from 0 to {story_count - 1}{suffix}")
    q = f.get("question")
    if not _nonempty_str(q):
        out.append("featured.question: missing or empty")
    elif len(q) > QUESTION_MAX:
        out.append(f"featured.question: {len(q)} chars, max {QUESTION_MAX}")
    choices = f.get("choices")
    if not isinstance(choices, list) or not 2 <= len(choices) <= 4:
        out.append("featured.choices: must be a list of 2 to 4 options")
    else:
        for i, c in enumerate(choices):
            if not _nonempty_str(c):
                out.append(f"featured.choices[{i}]: missing or empty")
            elif len(c) > CHOICE_MAX:
                out.append(f"featured.choices[{i}]: {len(c)} chars, max {CHOICE_MAX}")
    if f.get("variable") not in VARIABLES:
        out.append(f"featured.variable: must be exactly one of {', '.join(VARIABLES)}")
    if not _nonempty_str(f.get("workedAnswer")):
        out.append("featured.workedAnswer: missing or empty")
    return out


def validate_digest(d):
    """Return a list of human-readable problems with a digest (empty == fine).
    Every problem about the featured spark starts with "featured" so callers can
    tell a spark-only failure (ship without it) from a real one (fail the run)."""
    if not isinstance(d, dict):
        return ["digest is not a JSON object"]
    problems = []

    for key in REQUIRED_KEYS:
        v = d.get(key)
        if v is None or v == "" or v == [] or (isinstance(v, str) and not v.strip()):
            problems.append(f"{key}: missing or empty")

    stories = d.get("stories")
    story_count = len(stories) if isinstance(stories, list) else 0
    if isinstance(stories, list):
        if not 4 <= story_count <= 5:
            problems.append(f"stories: need 4 to 5, got {story_count}")
        for i, s in enumerate(stories):
            for field in ("title", "body", "spark"):
                if not isinstance(s, dict) or not _nonempty_str(s.get(field)):
                    problems.append(f"stories[{i}].{field}: missing or empty")

    problems.extend(_validate_featured(d.get("featured"), story_count))

    for path, text in _walk_strings(d, ""):
        for label, pattern in _BANNED:
            if pattern.search(text):
                problems.append(f"{path}: contains banned term \"{label}\"")
        if _EM_DASH in text:
            problems.append(f"{path}: contains an em dash (use --)")
        if any(c in text for c in _CURLY_QUOTES):
            problems.append(f"{path}: contains curly quotes (use straight quotes)")
    return problems


def is_featured_problem(problem):
    return problem.startswith("featured")
