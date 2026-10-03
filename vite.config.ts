import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    categories: {
      correctness: "error",
      suspicious: "error",
      perf: "error",
    },
    plugins: ["react", "unicorn", "typescript", "oxc", "vitest", "promise"],
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  fmt: {
    sortPackageJson: true,
  },
  staged: {
    "*.{ts,tsx}": "vp check --fix",
  },
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
    }),
    react({
      compiler: true,
    }),
    tailwindcss(),
  ],
  test: {
    include: ["test/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude: ["test/e2e/**"],
    setupFiles: ["./test/vitest.setup.ts"],
    silent: "passed-only",
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
});
