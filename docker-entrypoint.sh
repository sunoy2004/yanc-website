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
# Cloud Run expects the container to listen on the port specified by $PORT (default 8080).
# Update nginx default site to listen on $PORT at container start so the same image works locally and on Cloud Run.
PORT="${PORT:-8080}"
NGINX_DEFAULT_CONF="/etc/nginx/conf.d/default.conf"
if [ -f "$NGINX_DEFAULT_CONF" ]; then
  # Replace any "listen 80" with the desired port (keeps other directives intact).
  sed -i "s/listen 80;/listen ${PORT};/g" "$NGINX_DEFAULT_CONF" || true
fi

echo "nginx will listen on port: $PORT"

# Start nginx (pass through args)
exec "$@"

