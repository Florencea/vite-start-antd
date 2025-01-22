/// <reference types="@vitest/browser/providers/playwright" />

import "@ant-design/v5-patch-for-react-19";
import "vitest-browser-react";
import { configure } from "vitest-browser-react/pure";

configure({
  reactStrictMode: true,
});
