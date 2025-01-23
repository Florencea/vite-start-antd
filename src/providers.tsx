import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/zh-tw";
import "./global.css";
import { theme } from "./theme";

interface Props {
  children?: React.ReactNode;
  container: HTMLElement;
}

export const Providers = ({ container, children }: Props) => {
  return (
    <ConfigProvider
      getPopupContainer={() => container}
      locale={zhTW}
      theme={theme}
    >
      <App>
        <StyleProvider layer>{children}</StyleProvider>
      </App>
    </ConfigProvider>
  );
};
