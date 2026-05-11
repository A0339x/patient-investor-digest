#!/usr/bin/env bash
# Sync editorial files from the parent folder (the human editing surface) into
# patient-investor-digest/digest_context/ so the CI runner can read them.
#
# Run this after editing any of:
#   - Patient Investor Digest - Variables Reference.md
#   - Patient Investor Digest - Variable Pairings.md
#   - LP_DIGEST_STYLE_GUIDE.md
# then commit + push from inside patient-investor-digest/.

set -euo pipefail

INNER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PARENT_DIR="$(cd "$INNER_DIR/.." && pwd)"
DEST="$INNER_DIR/digest_context"

mkdir -p "$DEST"

FILES=(
  "Patient Investor Digest - Variables Reference.md"
  "Patient Investor Digest - Variable Pairings.md"
  "LP_DIGEST_STYLE_GUIDE.md"
)

for f in "${FILES[@]}"; do
  if [[ ! -f "$PARENT_DIR/$f" ]]; then
    echo "WARN: missing source file: $PARENT_DIR/$f" >&2
    continue
  fi
  cp "$PARENT_DIR/$f" "$DEST/$f"
  echo "synced: $f"
done

echo
echo "Done. Next: cd '$INNER_DIR' && git add digest_context/ && git commit && git push"
