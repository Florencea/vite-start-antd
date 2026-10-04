import { App, ConfigProvider } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/zh-tw";
import "./global.css";
import { useAntdTheme } from "./theme";

export interface ProvidersProps {
  children?: React.ReactNode;
  container: HTMLElement;
}

export function Providers({ container, children }: ProvidersProps) {
  const dynamicTheme = useAntdTheme();

  return (
    <ConfigProvider getPopupContainer={() => container} locale={zhTW} theme={dynamicTheme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
