import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  App,
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  type TableProps,
} from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";

interface CanarySearch {
  page: number;
  pageSize: number;
}

interface MockRecord {
  id: number;
  name: string;
  role: string;
  status: string;
}

const MOCK_DATA: MockRecord[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `User ${String(index + 1)}`,
  role: index % 2 === 0 ? "Admin" : "Member",
  status: index % 3 === 0 ? "Offline" : "Online",
}));

const COLUMNS: TableProps<MockRecord>["columns"] = [
  { title: "ID", dataIndex: "id", key: "id", width: 80 },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Role", dataIndex: "role", key: "role" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "Online" ? "success" : "default"}>{status}</Tag>
    ),
  },
];

export const Route = createFileRoute("/canary")({
  validateSearch: (search: Record<string, unknown>): CanarySearch => {
    const pageNum = Number(search.page);
    const pageSizeNum = Number(search.pageSize);
    return {
      page: Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1,
      pageSize:
        Number.isFinite(pageSizeNum) && pageSizeNum > 0 ? pageSizeNum : 10,
    };
  },
  component: CanaryPage,
});

interface FormValues {
  username: string;
}

function CanaryPage() {
  const { message, modal, notification } = App.useApp();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [form] = Form.useForm<FormValues>();

  const [currentColor] = useState(() => {
    if (typeof window === "undefined") return "";
    return getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim();
  });

  const handleFormFinish = (values: FormValues) => {
    message.success(`Form validated: ${values.username}`);
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (dayjs.isDayjs(date)) {
      message.info(`Selected date: ${date.format("YYYY-MM-DD")}`);
    }
  };

  const handleOpenModal = () => {
    modal.confirm({
      title: "Canary Confirmation",
      content: "Testing App.useApp modal portal rendered inside container.",
      onOk: () => {
        message.success("Modal action confirmed");
      },
    });
  };

  const handleTriggerNotification = () => {
    notification.info({
      message: "Canary Notification",
      description: "Testing notification overlay trigger.",
    });
  };

  return (
    <Space orientation="vertical" size="large" className="w-full">
      <Typography.Title level={3} className="m-0">
        Canary Regression Matrix
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="m-0">
        Integration testbed verifying SSOT tokens, i18n, form validation, router
        search params, and feedback overlays.
      </Typography.Paragraph>

      <Row gutter={[16, 16]}>
        {/* 1. Design Token Bridge (SSOT) */}
        <Col xs={24} md={12}>
          <Card title="1. Design Token Bridge (SSOT)">
            <Flex vertical gap="middle">
              <Typography.Text type="secondary">
                TailwindCSS v4 @theme serves as the SSOT, dynamically extracted
                into Ant Design tokens.
              </Typography.Text>
              <Flex align="center" gap="middle">
                <Flex align="center" gap="small">
                  <div
                    data-testid="tw-primary-sample"
                    className="bg-primary h-7 w-7 rounded"
                  />
                  <Typography.Text code>bg-primary</Typography.Text>
                </Flex>
                <Typography.Text type="secondary">===</Typography.Text>
                <Button
                  type="primary"
                  size="small"
                  data-testid="antd-primary-sample"
                >
                  Antd Primary Button
                </Button>
              </Flex>
              <Typography.Text>
                CSS Variable:{" "}
                <Tag color="purple" data-testid="css-variable-value">
                  {currentColor || "Not loaded"}
                </Tag>
              </Typography.Text>
            </Flex>
          </Card>
        </Col>

        {/* 2. Dayjs + DatePicker i18n */}
        <Col xs={24} md={12}>
          <Card title="2. Dayjs & DatePicker i18n">
            <Flex vertical gap="middle">
              <Typography.Text type="secondary">
                Verifies antd/es/locale/zh_TW and dayjs/locale/zh-tw integration
                with isDayjs validation.
              </Typography.Text>
              <DatePicker
                data-testid="canary-datepicker"
                placeholder="Select date"
                onChange={handleDateChange}
              />
            </Flex>
          </Card>
        </Col>

        {/* 3. Form Validation */}
        <Col xs={24} md={12}>
          <Card title="3. Form Validation">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormFinish}
              data-testid="canary-form"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input
                  placeholder="Enter username"
                  data-testid="username-input"
                />
              </Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  data-testid="submit-btn"
                >
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Reset
                </Button>
              </Space>
            </Form>
          </Card>
        </Col>

        {/* 4. Feedback Overlays & Portals */}
        <Col xs={24} md={12}>
          <Card title="4. Feedback & Portals">
            <Flex vertical gap="middle">
              <Typography.Text type="secondary">
                Verifies App.useApp modal and notification portals render within
                container.
              </Typography.Text>
              <Space wrap>
                <Button
                  type="primary"
                  onClick={handleOpenModal}
                  data-testid="modal-trigger-btn"
                >
                  Open Confirm Modal
                </Button>
                <Button
                  onClick={handleTriggerNotification}
                  data-testid="notification-trigger-btn"
                >
                  Trigger Notification
                </Button>
              </Space>
            </Flex>
          </Card>
        </Col>

        {/* 5. Table + Router Search Params */}
        <Col xs={24}>
          <Card title="5. Table & Search Params">
            <Table<MockRecord>
              rowKey="id"
              dataSource={MOCK_DATA}
              columns={COLUMNS}
              pagination={{
                current: search.page,
                pageSize: search.pageSize,
                total: MOCK_DATA.length,
                showSizeChanger: true,
                showTotal: (total) => `Total ${String(total)} items`,
                onChange: (page, pageSize) => {
                  void navigate({
                    search: { page, pageSize },
                  });
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
