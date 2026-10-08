import { afterEach } from "vite-plus/test";
import { cleanupApp } from "./test-utils";

afterEach(async () => {
  await cleanupApp();
});
