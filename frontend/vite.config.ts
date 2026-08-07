import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  define: {
    global: "globalThis",
  },

  optimizeDeps: {
    entries: ["index.html"],
  },

  server: {
    watch: {
      ignored: [
        "**/public/WebViewer/doc/**",
        "**/public/WebViewer/samples/**",
      ],
    },
  },
});