#!/bin/sh
set -eu

# Path where the built site is served from in the nginx image
OUT_FILE=/usr/share/nginx/html/runtime-config.js

# Helper: escape single quotes for safe JS single-quoted string
escape() {
  printf "%s" "$1" | sed "s/'/\\\\'/g"
}

SUP_URL=""
SUP_KEY=""

if [ -n "${VITE_SUPABASE_URL:-}" ]; then
  SUP_URL=$(escape "$VITE_SUPABASE_URL")
fi

if [ -n "${VITE_SUPABASE_ANON_KEY:-}" ]; then
  SUP_KEY=$(escape "$VITE_SUPABASE_ANON_KEY")
fi

cat > "$OUT_FILE" <<EOF
// runtime config injected at container start
window.__RUNTIME_SUPABASE_URL='${SUP_URL}';
window.__RUNTIME_SUPABASE_ANON_KEY='${SUP_KEY}';
EOF

chmod 644 "$OUT_FILE"

exec "$@"

