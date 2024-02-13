/// <reference types="vitest" />

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { join } from "node:path";
import { cwd } from "node:process";
import { defineConfig, loadEnv, type CommonServerOptions } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const {
  PORT,
  VITE_API_PREFIX,
  PROXY_SERVER,
  VITE_WEB_BASE,
  VITE_TITLE,
  VITE_FAVICON,
} = loadEnv("development", cwd(), "");

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
    react(),
    TanStackRouterVite(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,jpg,png,svg,avif}"],
      },
      manifest: {
        name: VITE_TITLE,
        short_name: VITE_TITLE,
        description: VITE_TITLE,
        theme_color: "#fff",
        icons: [
          {
            src: VITE_FAVICON,
            sizes: "512x512",
            type: "image/png",
            purpose: ["maskable", "any"],
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
