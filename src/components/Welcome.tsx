import logo from "@/assets/vite.svg";
import { App, DatePicker, Descriptions, Flex, Space, Tag, version } from "antd";
import dayjs from "dayjs";

export const Welcome = () => {
  const { message } = App.useApp();
  return (
    <Flex
      className="h-svh"
      vertical
      justify="center"
      align="center"
      gap="middle"
    >
      <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img
          src={logo}
          className="pointer-events-none h-[256px] w-[256px]"
          alt="Vite logo"
        />
      </a>
      <h1 className="text-3xl font-bold text-primary">
        Vite + React + TailwindCSS + antd
      </h1>
      <Descriptions bordered>
        <Descriptions.Item label="antd">
          <Space>
            <Tag color="processing">{version}</Tag>
            <DatePicker
              name="date"
              onChange={(date) => {
                if (dayjs.isDayjs(date)) {
                  void message.info(date.toDate().toLocaleString());
                }
              }}
            />
          </Space>
        </Descriptions.Item>
      </Descriptions>
    </Flex>
  );
};
