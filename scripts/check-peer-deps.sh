#!/usr/bin/env bash
# Print npm peer dependency issues and return non-zero if issues found
set -euo pipefail

# Run npm ci first (should already be done in CI). Then list peer conflicts.
CONFLICTS=$(npm ls 2>&1 | sed -n '1,400p' | grep -i "UNMET PEER DEPENDENCY\|ERESOLVE" || true)
if [[ -n "$CONFLICTS" ]]; then
  echo "Peer dependency conflicts detected:"
  echo "$CONFLICTS"
  exit 1
else
  echo "No peer dependency conflicts detected."
fi
