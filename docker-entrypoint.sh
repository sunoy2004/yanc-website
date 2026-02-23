#!/bin/sh
set -e

# Generate runtime-config.js from environment variables so the built bundle can read runtime values.
# This file will be served from the app root and should be loaded before the application's main JS.
RUNTIME_FILE="/usr/share/nginx/html/runtime-config.js"

echo "/* runtime config injected at container start */" > "$RUNTIME_FILE"
echo "window.__RUNTIME_CONFIG__ = {" >> "$RUNTIME_FILE"
echo "  VITE_SUPABASE_URL: \"${VITE_SUPABASE_URL:-}\"," >> "$RUNTIME_FILE"
echo "  VITE_SUPABASE_ANON_KEY: \"${VITE_SUPABASE_ANON_KEY:-}\"," >> "$RUNTIME_FILE"
echo "  VITE_API_BASE_URL: \"${VITE_API_BASE_URL:-}\"" >> "$RUNTIME_FILE"
echo "};" >> "$RUNTIME_FILE"

chmod 644 "$RUNTIME_FILE"

echo "Starting nginx..."
exec "$@"

