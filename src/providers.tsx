import { App, ConfigProvider } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/zh-tw";
import "./global.css";
import { useAntdTheme } from "./theme";

interface Props {
  children?: React.ReactNode;
  container: HTMLElement;
}

export const Providers = ({ container, children }: Props) => {
  const dynamicTheme = useAntdTheme();

  return (
    <ConfigProvider
      getPopupContainer={() => container}
      locale={zhTW}
      theme={dynamicTheme}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};
