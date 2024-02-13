import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/zh-tw";
import "tailwindcss/tailwind.css";
import { theme } from "./theme";

interface Props {
  container: HTMLDivElement;
  children?: React.ReactNode;
}

export const Providers = ({ container, children }: Props) => {
  return (
    <ConfigProvider
      getPopupContainer={() => container}
      locale={zhTW}
      theme={theme}
    >
      <StyleProvider hashPriority="high">
        <App>{children}</App>
      </StyleProvider>
    </ConfigProvider>
  );
};
