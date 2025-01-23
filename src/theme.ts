import type { ThemeConfig } from "antd";

const primaryColor = getComputedStyle(
  document.documentElement,
).getPropertyValue("--color-primary");

export const theme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    colorPrimary: primaryColor,
    colorInfo: primaryColor,
  },
};
