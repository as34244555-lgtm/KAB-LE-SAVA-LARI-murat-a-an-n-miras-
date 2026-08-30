import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "./",
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts"],
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: true,
  },
});
