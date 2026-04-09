// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      visualizer({
        filename: "dist/stats.html", // generate report
        open: false, // set to true if you want browser to open automatically
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false, // disable source maps for production
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunk
          vendor: [
            "react",
            "react-dom",
            "@tanstack/react-query",
            "framer-motion",
            "recharts",
            "sonner",
          ],
        },
      },
    },
  },
}));
