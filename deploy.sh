#!/usr/bin/env bash
# Pull the latest code and rebuild the static site on the VPS.
# nginx serves ./out/ directly, so no service restart is needed.
set -euo pipefail
cd "$(dirname "$0")"

echo "→ git pull"
git pull --ff-only

echo "→ npm ci"
npm ci

echo "→ npm run build"
npm run build

echo "✓ deployed $(git rev-parse --short HEAD) at $(date '+%Y-%m-%d %H:%M:%S')"
