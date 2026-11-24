#!/usr/bin/env bash
# Runs on the server every 30 seconds (constriva-landing.timer), as user deploy.
# Pulls the built site from the public `release` branch and switches to it in one step.
set -euo pipefail
REPO="https://github.com/shivansh415/constriva-app-landing.git"
BASE="/var/www/constriva-landing"
GITDIR="$BASE/repo.git"

[ -d "$GITDIR" ] || git init -q --bare "$GITDIR"
NEW=$(git ls-remote "$REPO" refs/heads/release | cut -f1)
[ -n "$NEW" ] || exit 0
CUR=$(basename "$(readlink -f "$BASE/current" 2>/dev/null || echo none)")
[ "$NEW" = "$CUR" ] && exit 0

git --git-dir="$GITDIR" fetch -q --depth 1 "$REPO" release
mkdir -p "$BASE/releases/$NEW"
git --git-dir="$GITDIR" archive "$NEW" | tar -x -C "$BASE/releases/$NEW"
[ -s "$BASE/releases/$NEW/index.html" ] || { echo "release $NEW has no index.html"; exit 1; }
ln -sfn "$BASE/releases/$NEW" "$BASE/current.new"
mv -Tf "$BASE/current.new" "$BASE/current"
echo "now serving $NEW"
