"""Unit tests for the pure functions behind the weekly digest. Plain stdlib:

    python3 scripts/test_generate.py
"""

import copy
import os
import sys
import unittest
from datetime import date, datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from digest_rules import (  # noqa: E402
    FEATURED_MISSING,
    is_featured_problem,
    publish_at_iso,
    target_issue,
    validate_digest,
)
from platform_notify import build_payload  # noqa: E402


def utc(*args):
    return datetime(*args, tzinfo=timezone.utc)


def good_digest():
    return {
        "id": "10-12-2026",
        "date": "October 12, 2026",
        "title": "LP Mastermind\nMarket Update",
        "subtitle": "What moved this week.",
        "snapshot": [{"label": "BTC", "value": "+1.2%"}],
        "intro": "Prices are flat.",
        "stories": [
            {"title": f"Story {i}", "body": "Body text.", "spark": "What would you change?"}
            for i in range(4)
        ],
        "closing": "What will you tweak Monday?",
        "publishAt": "2026-10-12T09:00:00-07:00",
        "featured": {
            "storyIndex": 1,
            "question": "Your pool keeps leaving range. Skew the range or move to a correlated pair?",
            "choices": ["Skew the range", "Move to a correlated pair"],
            "variable": "Range",
            "workedAnswer": "It depends on the Range you can hold. Correlation matters too.",
        },
    }


class TargetIssue(unittest.TestCase):
    def test_sunday_evening_pacific_is_monday_utc(self):
        # Mon 02:00 UTC == Sun Oct 11 19:00 PDT -> the Monday that is about to start.
        d, i, s = target_issue(utc(2026, 10, 12, 2, 0))
        self.assertEqual((d, i, s), (date(2026, 10, 12), "10-12-2026", "October 12, 2026"))

    def test_monday_morning_pacific_is_today(self):
        d, i, _ = target_issue(utc(2026, 10, 12, 13, 0))  # 06:00 PDT Monday
        self.assertEqual((d, i), (date(2026, 10, 12), "10-12-2026"))

    def test_wednesday_is_next_monday(self):
        d, i, _ = target_issue(utc(2026, 10, 7, 15, 0))
        self.assertEqual((d, i), (date(2026, 10, 12), "10-12-2026"))

    def test_monday_utc_early_but_still_sunday_pacific_late_in_year(self):
        # PST: Mon 01:00 UTC == Sun 17:00 PST.
        d, _, _ = target_issue(utc(2026, 11, 2, 1, 0))
        self.assertEqual(d, date(2026, 11, 2))


class PublishAt(unittest.TestCase):
    def test_pdt(self):
        self.assertEqual(publish_at_iso(date(2026, 10, 12)), "2026-10-12T09:00:00-07:00")

    def test_pst_after_dst_ends(self):
        # US DST ended 2026-11-01.
        self.assertEqual(publish_at_iso(date(2026, 11, 2)), "2026-11-02T09:00:00-08:00")


class Validate(unittest.TestCase):
    def test_valid_passes(self):
        self.assertEqual(validate_digest(good_digest()), [])

    def test_five_stories_ok_three_not(self):
        d = good_digest()
        d["stories"].append(copy.deepcopy(d["stories"][0]))
        self.assertEqual(validate_digest(d), [])
        d["stories"] = d["stories"][:3]
        self.assertTrue(any(p.startswith("stories:") for p in validate_digest(d)))

    def test_banned_terms(self):
        d = good_digest()
        d["stories"][0]["body"] = "This avoids Impermanent Loss."
        d["intro"] = "Watch your IL."
        problems = validate_digest(d)
        self.assertTrue(any("stories[0].body" in p and "impermanent loss" in p for p in problems))
        self.assertTrue(any(p.startswith("intro") and '"IL"' in p for p in problems))

    def test_il_is_standalone_and_case_sensitive(self):
        d = good_digest()
        d["intro"] = "Bill will build a pill. Til then, il y a."
        self.assertEqual(validate_digest(d), [])

    def test_bad_variable(self):
        d = good_digest()
        d["featured"]["variable"] = "Liquidity"
        problems = validate_digest(d)
        self.assertTrue(any(p.startswith("featured.variable") for p in problems))
        self.assertTrue(all(is_featured_problem(p) for p in problems))

    def test_five_choices(self):
        d = good_digest()
        d["featured"]["choices"] = list("abcde")
        self.assertTrue(any(p.startswith("featured.choices") for p in validate_digest(d)))

    def test_long_question_and_choice(self):
        d = good_digest()
        d["featured"]["question"] = "x" * 221
        d["featured"]["choices"][0] = "y" * 49
        problems = validate_digest(d)
        self.assertTrue(any("featured.question" in p for p in problems))
        self.assertTrue(any("featured.choices[0]" in p for p in problems))

    def test_story_index_out_of_range(self):
        d = good_digest()
        d["featured"]["storyIndex"] = 4
        self.assertTrue(any("storyIndex" in p for p in validate_digest(d)))

    def test_missing_featured(self):
        d = good_digest()
        del d["featured"]
        self.assertEqual(validate_digest(d), [FEATURED_MISSING])

    def test_em_dash_and_curly_quotes(self):
        d = good_digest()
        d["stories"][2]["body"] = "Wide ranges — not narrow ones."
        d["featured"]["workedAnswer"] = "It’s about “Range”."
        problems = validate_digest(d)
        self.assertTrue(any("stories[2].body" in p and "em dash" in p for p in problems))
        self.assertTrue(any("featured.workedAnswer" in p and "curly" in p for p in problems))

    def test_missing_top_level_and_story_fields(self):
        d = good_digest()
        d["closing"] = " "
        del d["stories"][0]["spark"]
        problems = validate_digest(d)
        self.assertIn("closing: missing or empty", problems)
        self.assertIn("stories[0].spark: missing or empty", problems)

    def test_not_an_object(self):
        self.assertEqual(validate_digest([]), ["digest is not a JSON object"])


class Payload(unittest.TestCase):
    def test_payload_shape(self):
        p = build_payload(good_digest())
        self.assertEqual(p["digest_id"], "10-12-2026")
        self.assertEqual(p["title"], "LP Mastermind Market Update")
        self.assertEqual(p["publish_at"], "2026-10-12T09:00:00-07:00")
        self.assertEqual(p["stories"][1], {"index": 1, "title": "Story 1", "spark": "What would you change?"})
        self.assertEqual(p["featured"]["variable"], "Range")

    def test_payload_without_featured(self):
        d = good_digest()
        del d["featured"]
        self.assertIsNone(build_payload(d)["featured"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
