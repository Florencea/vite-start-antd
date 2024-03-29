/// <reference types="vitest" />

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { join } from "node:path";
import { cwd } from "node:process";
import { defineConfig, loadEnv, type CommonServerOptions } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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
  plugins: [react(), TanStackRouterVite(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
