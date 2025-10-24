/// <reference types="vitest/config" />

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { join } from "node:path";
import { cwd } from "node:process";
import { defineConfig, loadEnv, type CommonServerOptions } from "vite";

const { PORT, VITE_API_PREFIX, PROXY_SERVER, VITE_WEB_BASE } = loadEnv(
  "development",
  cwd(),
  "",
);

const SERVER_OPTIONS: CommonServerOptions = {
  port: parseInt(PORT, 10),
  strictPort: true,
  proxy: {
    [join(VITE_WEB_BASE, VITE_API_PREFIX)]: {
      target: PROXY_SERVER,
      changeOrigin: true,
      secure: false,
    },
  },
};

const PREVIEW_OPTIONS: CommonServerOptions = {
  ...SERVER_OPTIONS,
  port: parseInt(PORT, 10) + 10000,
};

export default defineConfig({
  base: VITE_WEB_BASE,
  server: SERVER_OPTIONS,
  preview: PREVIEW_OPTIONS,
  build: {
    chunkSizeWarningLimit: Infinity,
    reportCompressedSize: false,
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      verboseFileRoutes: false,
      tmpDir: "node_modules/.tmp",
    }),
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ["@ant-design/v5-patch-for-react-19", "vitest-browser-react"],
  },
  test: {
    setupFiles: ["./test/vitest.setup.ts"],
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
      screenshotFailures: false,
    },
  },
});
