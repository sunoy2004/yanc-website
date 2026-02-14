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
    // Proxy API requests to the CMS API server
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
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
  // Build optimizations
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor';
            if (id.includes('react-router-dom')) return 'router';
            if (id.includes('@radix-ui') || id.includes('lucide-react')) return 'ui';
            if (id.includes('three') || id.includes('@react-three')) return 'three';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}));
