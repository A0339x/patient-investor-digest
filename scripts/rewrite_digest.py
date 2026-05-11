"""Splice a rewritten digest into data.js in place.

Reads scripts/rewrites/<id>.json and replaces the matching digest in data.js.
Run from inside patient-investor-digest/:

    python3 scripts/rewrite_digest.py 05-04-2026
"""

import argparse
import json
import os
import sys

DATA_FILE = "data.js"
REWRITES_DIR = os.path.join("scripts", "rewrites")


def load_replacement(digest_id: str) -> dict:
    path = os.path.join(REWRITES_DIR, f"{digest_id}.json")
    if not os.path.exists(path):
        print(f"ERROR: rewrite file not found: {path}", file=sys.stderr)
        sys.exit(1)
    with open(path) as f:
        rep = json.load(f)
    if rep.get("id") != digest_id:
        print(
            f"ERROR: rewrite file id {rep.get('id')!r} does not match arg {digest_id!r}",
            file=sys.stderr,
        )
        sys.exit(1)
    return rep


def main():
    p = argparse.ArgumentParser()
    p.add_argument("id", help="digest id, e.g. 05-04-2026")
    args = p.parse_args()

    if not os.path.exists(DATA_FILE):
        print(
            f"ERROR: {DATA_FILE} not found. Run from inside patient-investor-digest/.",
            file=sys.stderr,
        )
        sys.exit(1)

    replacement = load_replacement(args.id)

    with open(DATA_FILE) as f:
        content = f.read()
    start = content.index("[")
    end = content.rindex("]") + 1
    digests = json.loads(content[start:end])

    found = False
    for i, d in enumerate(digests):
        if d.get("id") == args.id:
            digests[i] = replacement
            found = True
            break

    if not found:
        print(f"ERROR: digest with id={args.id} not found in {DATA_FILE}", file=sys.stderr)
        sys.exit(1)

    with open(DATA_FILE, "w") as f:
        f.write("// data.js — Patient Investor Digest\n")
        f.write("// Scheduled task prepends new issues to the TOP of this array automatically.\n")
        f.write("// Manual additions: follow the same object structure and add to the top.\n")
        f.write(f"const DIGESTS = {json.dumps(digests, indent=2)};\n")

    print(f"Rewrote digest {args.id} in {DATA_FILE}")


if __name__ == "__main__":
    main()
