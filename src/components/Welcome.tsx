import { Link } from "@tanstack/react-router";
import {
  Button,
  Flex,
  Space,
  Tag,
  Typography,
  version as antdVersion,
} from "antd";
import { version as reactVersion } from "react";
import logo from "../assets/vite.svg";

export const Welcome = () => {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      gap="large"
      className="min-h-[60vh]"
    >
      <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img src={logo} className="h-40 w-40" alt="Vite logo" />
      </a>
      <Typography.Title level={2} className="m-0">
        Vite + React + TailwindCSS + antd
      </Typography.Title>
      <Space size="middle" wrap>
        <Tag color="processing" data-testid="react-version">
          React {reactVersion}
        </Tag>
        <Tag color="purple" data-testid="antd-version">
          antd {antdVersion}
        </Tag>
        <Tag color="cyan">TailwindCSS v4</Tag>
        <Tag color="geekblue">TanStack Router</Tag>
      </Space>
      <Link to="/canary" search={{ page: 1, pageSize: 10 }}>
        <Button type="primary" size="large" data-testid="canary-btn">
          Go to Canary Matrix
        </Button>
      </Link>
    </Flex>
  );
};
