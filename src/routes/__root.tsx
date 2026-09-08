import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Flex, Layout, Space, Typography } from "antd";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <Layout className="min-h-screen">
      <Layout.Header>
        <Flex justify="space-between" align="center" className="h-full">
          <Typography.Title level={4} className="m-0 text-white">
            Vite Start Antd
          </Typography.Title>
          <Space size="large">
            <Link
              to="/"
              className="text-white/85 hover:text-white [&.active]:font-bold [&.active]:text-white"
            >
              Home
            </Link>
            <Link
              to="/canary"
              search={{ page: 1, pageSize: 10 }}
              className="text-white/85 hover:text-white [&.active]:font-bold [&.active]:text-white"
            >
              Canary
            </Link>
          </Space>
        </Flex>
      </Layout.Header>
      <Layout.Content className="p-6">
        <Outlet />
      </Layout.Content>
      <Layout.Footer className="text-center">
        Vite + React 19 + Ant Design v6 + TailwindCSS v4
      </Layout.Footer>
    </Layout>
  );
}
