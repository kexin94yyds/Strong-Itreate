#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

DEPLOY_DIR="${DEPLOY_DIR:-dist}"
DRY_RUN="${DRY_RUN:-0}"
SKIP_BUILD="${SKIP_BUILD:-0}"

fail() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

require_file() {
  [[ -f "$1" ]] || fail "missing required file: $1"
}

require_match() {
  local pattern="$1"
  local path="$2"
  rg -q "$pattern" "$path" || fail "missing pattern '$pattern' in $path"
}

if [[ "$DEPLOY_DIR" != "dist" ]]; then
  fail "production deploy directory must be dist, got: $DEPLOY_DIR"
fi

if [[ "$SKIP_BUILD" != "1" ]]; then
  npm run build
fi

require_file "dist/index.html"
require_file "dist/iterate/index.html"

root_asset_count="$(find dist/assets -maxdepth 1 -type f -name 'main-*.js' | wc -l | tr -d ' ')"
iterate_asset_count="$(find dist/iterate/assets -maxdepth 1 -type f -name 'index-*.js' | wc -l | tr -d ' ')"

[[ "$root_asset_count" -gt 0 ]] || fail "missing root JS asset dist/assets/main-*.js"
[[ "$iterate_asset_count" -gt 0 ]] || fail "missing iterate JS asset dist/iterate/assets/index-*.js"

require_match '<title>可鑫</title>' "dist/index.html"
require_match '越 来 越 强' "dist/index.html"

iterate_bundle_path="$(rg -o '/iterate/assets/index-[^"]+\.js' dist/iterate/index.html | head -n 1 || true)"
[[ -n "$iterate_bundle_path" ]] || fail "cannot find referenced iterate bundle in dist/iterate/index.html"
iterate_bundle="dist${iterate_bundle_path}"
require_file "$iterate_bundle"
require_match '为什么是 iterate' "$iterate_bundle"
require_match 'XRrM6HONwmHlvw3CF-llVg' "$iterate_bundle"

deploy_cmd=(npx --no-install netlify deploy --prod --dir "$DEPLOY_DIR" --json)
if [[ -n "${NETLIFY_DEPLOY_MESSAGE:-}" ]]; then
  deploy_cmd+=(--message "$NETLIFY_DEPLOY_MESSAGE")
fi

printf 'Deploy directory: %s\n' "$DEPLOY_DIR"
printf 'Root JS assets: %s\n' "$root_asset_count"
printf 'Iterate JS assets: %s\n' "$iterate_asset_count"

if [[ "$DRY_RUN" == "1" ]]; then
  printf 'DRY_RUN=1, would run:'
  printf ' %q' "${deploy_cmd[@]}"
  printf '\n'
  exit 0
fi

"${deploy_cmd[@]}"

check_status() {
  local url="$1"
  local status
  status="$(curl -sS -L -o /dev/null -w '%{http_code}' --max-time 20 "$url")"
  [[ "$status" == "200" ]] || fail "expected HTTP 200 for $url, got $status"
}

check_status "https://iterate.xin/"
check_status "https://iterate.xin/index.html"
check_status "https://iterate.xin/iterate/index.html"

curl -sSL --max-time 20 "https://iterate.xin/" | rg -q '<title>可鑫</title>' \
  || fail "root page title verification failed"
curl -sSL --max-time 20 "https://iterate.xin${iterate_bundle_path}" \
  | rg -q '为什么是 iterate' \
  || fail "iterate CTA verification failed"

printf 'Production deploy verified.\n'
