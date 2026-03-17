// Default runtime config (empty). In Docker, docker-entrypoint.sh overwrites this file with real values.
window.__RUNTIME_CONFIG__ = window.__RUNTIME_CONFIG__ || {
  VITE_SUPABASE_URL: "",
  VITE_SUPABASE_ANON_KEY: "",
  VITE_API_BASE_URL: ""
};
