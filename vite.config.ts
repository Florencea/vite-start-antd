import generouted from "@generouted/react-router/plugin";
import react from "@vitejs/plugin-react";
import { join } from "node:path";
import { cwd } from "node:process";
import { CommonServerOptions, defineConfig, loadEnv } from "vite";

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

export default defineConfig({
  base: VITE_WEB_BASE,
  server: SERVER_OPTIONS,
  preview: SERVER_OPTIONS,
  build: {
    chunkSizeWarningLimit: Infinity,
    reportCompressedSize: false,
    rollupOptions: {
      /**
       * disable rollup 4 build warning
       * https://rollupjs.org/configuration-options/#pure
       */
      onLog: (level, log, handler) => {
        if (log.code !== "INVALID_ANNOTATION") {
          handler(level, log);
        }
      },
    },
  },
  plugins: [react(), generouted()],
});
