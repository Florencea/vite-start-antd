import type { ThemeConfig } from "antd";

const PRIMARY_COLOR = import.meta.env.VITE_THEME_COLOR_PRIMARY;

export const theme: ThemeConfig = {
  token: {
    colorPrimary: PRIMARY_COLOR,
    colorInfo: PRIMARY_COLOR,
  },
};
