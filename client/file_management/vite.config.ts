/// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // ✅ This enables describe/it/expect without imports
    environment: "jsdom", // ✅ Needed for DOM testing
    setupFiles: "./src/setupTests.ts" // optional
  },
});
