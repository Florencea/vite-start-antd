/// <reference types="vitest/config" />
/// <reference types="@vitest/browser/providers/playwright" />

import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
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
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ["@ant-design/v5-patch-for-react-19", "vitest-browser-react"],
  },
  test: {
    setupFiles: ["./test/vitest.setup.ts"],
    browser: {
      provider: "playwright",
      enabled: true,
      headless: true,
      instances: [
        {
          browser: "chromium",
          launch: {},
          context: {},
        },
      ],
      screenshotFailures: false,
    },
  },
});
