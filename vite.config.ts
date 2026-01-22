import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Allow external connections
    port: 8080,
    strictPort: false,
    hmr: {
      overlay: false,
    },
    // Allow requests from Render's deployment domains
    allowedHosts: [".onrender.com", "localhost", "127.0.0.1"]
  },
  preview: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: false,
    // Allow requests from any host in preview mode
    // This is used when previewing the built application
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Base configuration for deployment
  base: mode === "production" ? "/" : "/",
}));
