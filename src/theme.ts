import type { ThemeConfig } from "antd";

const PRIMARY_COLOR = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-primary")
  .trim();

export const theme: ThemeConfig = {
  hashed: false,
  token: {
    colorPrimary: PRIMARY_COLOR,
    colorInfo: PRIMARY_COLOR,
  },
  components: {
    Layout: {
      headerBg: PRIMARY_COLOR,
    },
  },
};
