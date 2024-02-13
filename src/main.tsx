import { StyleProvider } from "@ant-design/cssinjs";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { App, ConfigProvider } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/zh-tw";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import tailwindConfig from "../tailwind.config.ts";
import { routeTree } from "./routeTree.gen";

const container = document.getElementById("root") as HTMLDivElement;

const PRIMARY_COLOR = tailwindConfig.theme.extend.colors.primary;

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(container).render(
  <StrictMode>
    <ConfigProvider
      getPopupContainer={() => container}
      locale={zhTW}
      theme={{
        token: {
          colorPrimary: PRIMARY_COLOR,
          colorInfo: PRIMARY_COLOR,
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <App>
          <RouterProvider router={router} />
        </App>
      </StyleProvider>
    </ConfigProvider>
  </StrictMode>,
);
