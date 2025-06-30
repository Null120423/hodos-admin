import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import { FileUp, Filter, ScanEyeIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";

import useTransactionPagination from "@/services/hooks/admin/transactions/useTransactionPagination";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export enum TransactionType {
  SUBSCRIPTION_PAYMENT = "subscription_payment",
}

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESSFUL = "successful",
  FAILED = "failed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
  PROCESSING = "processing",
}

const statusOptions = [
  { label: "Pending", value: TransactionStatus.PENDING, color: "orange" },
  { label: "Successful", value: TransactionStatus.SUCCESSFUL, color: "green" },
  { label: "Failed", value: TransactionStatus.FAILED, color: "red" },
  { label: "Cancelled", value: TransactionStatus.CANCELLED, color: "gray" },
  { label: "Refunded", value: TransactionStatus.REFUNDED, color: "blue" },
  {
    label: "Partially Refunded",
    value: TransactionStatus.PARTIALLY_REFUNDED,
    color: "purple",
  },
  { label: "Processing", value: TransactionStatus.PROCESSING, color: "cyan" },
];

const typeOptions = [
  {
    label: "Subscription Payment",
    value: TransactionType.SUBSCRIPTION_PAYMENT,
  },
];

export default function TransactionManagementScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const {
    data: transactions,
    total,
    isLoading,
    isRefetching,
    totalMoney,
    totalSuccessful,
    refetch,
  } = useTransactionPagination({
    skip: 0,
    take: 10,
    where: {
      searchText: searchText.trim(),
      status: selectedStatus,
      type: selectedType,
    },
  });

  const handleViewDetail = (record: any) => {
    setSelectedTransaction(record);
    setIsDrawerVisible(true);
  };

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "__user__",
      render: (user: any) => {
        return user?.username || "-";
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) =>
        typeOptions.find((t) => t.value === type)?.label || type,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc: string) => <span>{desc}</span>,
    },
    {
      title: "Amount",
      key: "amount",
      render: (record: any) => (
        <span>
          {record.amount} {record.currency}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const opt = statusOptions.find((s) => s.value === status);

        return <Tag color={opt?.color}>{opt?.label || status}</Tag>;
      },
    },
    {
      title: "Gateway",
      dataIndex: "paymentGateway",
      key: "paymentGateway",
    },
    {
      title: "Gateway Txn ID",
      dataIndex: "gatewayTransactionId",
      key: "gatewayTransactionId",
    },
    {
      title: "Processed At",
      dataIndex: "processedAt",
      key: "processedAt",
      render: (date: string) =>
        date ? new Date(date).toLocaleString("en-US") : "-",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        date ? new Date(date).toLocaleString("en-US") : "-",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleViewDetail(record)}>
          <ScanEyeIcon />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-sm border-b">
        <div className="flex justify-between items-center">
          <Title className="m-0" level={3}>
            Transaction Management
          </Title>
          <Space>
            <Button icon={<FileUp size={16} />}>Export Data</Button>
          </Space>
        </div>
      </Header>
      <Content className="p-6 bg-gray-50">
        <Row className="mb-6" gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic prefix="💸" title="Total Transactions" value={total} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                prefix="✅"
                title="Successful"
                value={totalSuccessful}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                precision={2}
                prefix="💰"
                suffix="VND"
                title="Total Amount"
                value={totalMoney}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
        </Row>
        <Card className="mb-6">
          <Row gutter={16}>
            <Col span={8}>
              <Input
                allowClear
                placeholder="Search user, description, gateway txn id..."
                prefix={<Search size={16} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                allowClear
                placeholder="Filter by status"
                style={{ width: "100%" }}
                value={selectedStatus}
                onChange={setSelectedStatus}
              >
                {statusOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    <Tag color={option.color}>{option.label}</Tag>
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                allowClear
                placeholder="Filter by type"
                style={{ width: "100%" }}
                value={selectedType}
                onChange={setSelectedType}
              >
                {typeOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              <Button
                icon={<Filter size={16} />}
                onClick={() => {
                  setSearchText("");
                  setSelectedStatus(undefined);
                  setSelectedType(undefined);
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={transactions}
            loading={isLoading || isRefetching}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} transactions`,
            }}
            rowKey="id"
          />
        </Card>
        <Drawer
          bodyStyle={{ padding: 0 }}
          open={isDrawerVisible}
          title="Transaction Details"
          width={520}
          onClose={() => setIsDrawerVisible(false)}
        >
          {selectedTransaction && (
            <div className="p-6">
              <Typography.Title className="mb-3" level={5}>
                General Info
              </Typography.Title>
              <Row className="mb-2" gutter={16}>
                <Col span={12}>
                  <div>
                    <Text strong>User:</Text>
                    <div>{selectedTransaction.user?.name || "-"}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text strong>Status:</Text>
                    <div>
                      <Tag
                        color={
                          statusOptions.find(
                            (s) => s.value === selectedTransaction.status
                          )?.color
                        }
                        style={{
                          fontWeight: 500,
                          fontSize: 14,
                          padding: "2px 12px",
                        }}
                      >
                        {statusOptions.find(
                          (s) => s.value === selectedTransaction.status
                        )?.label || selectedTransaction.status}
                      </Tag>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2" gutter={16}>
                <Col span={12}>
                  <div>
                    <Text strong>Type:</Text>
                    <div>
                      {typeOptions.find(
                        (t) => t.value === selectedTransaction.type
                      )?.label || selectedTransaction.type}
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text strong>Amount:</Text>
                    <div style={{ fontWeight: 600, color: "#1677ff" }}>
                      {selectedTransaction.amount}{" "}
                      {selectedTransaction.currency}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2" gutter={16}>
                <Col span={24}>
                  <div>
                    <Text strong>Description:</Text>
                    <div>{selectedTransaction.description || "-"}</div>
                  </div>
                </Col>
              </Row>
              <Divider className="my-3" />
              <Typography.Title className="mb-3" level={5}>
                Payment Info
              </Typography.Title>
              <Row className="mb-2" gutter={16}>
                <Col span={12}>
                  <div>
                    <Text strong>Gateway:</Text>
                    <div>{selectedTransaction.paymentGateway || "-"}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text strong>Gateway Txn ID:</Text>
                    <div style={{ fontFamily: "monospace" }}>
                      {selectedTransaction.gatewayTransactionId || "-"}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2" gutter={16}>
                <Col span={12}>
                  <div>
                    <Text strong>Processed At:</Text>
                    <div>
                      {selectedTransaction.processedAt
                        ? new Date(
                            selectedTransaction.processedAt
                          ).toLocaleString("en-US")
                        : "-"}
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text strong>Created At:</Text>
                    <div>
                      {selectedTransaction.createdAt
                        ? new Date(
                            selectedTransaction.createdAt
                          ).toLocaleString("en-US")
                        : "-"}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2" gutter={16}>
                <Col span={12}>
                  <div>
                    <Text strong>Updated At:</Text>
                    <div>
                      {selectedTransaction.updatedAt
                        ? new Date(
                            selectedTransaction.updatedAt
                          ).toLocaleString("en-US")
                        : "-"}
                    </div>
                  </div>
                </Col>
              </Row>
              <Divider className="my-3" />
              <Typography.Title className="mb-3" level={5}>
                Related Entity
              </Typography.Title>
              <Row className="mb-2" gutter={16}>
                <Col span={12}>
                  <div>
                    <Text strong>Entity Type:</Text>
                    <div>{selectedTransaction.relatedEntityType || "-"}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text strong>Entity ID:</Text>
                    <div style={{ fontFamily: "monospace" }}>
                      {selectedTransaction.relatedEntityId || "-"}
                    </div>
                  </div>
                </Col>
              </Row>
              <Divider className="my-3" />
              <Typography.Title className="mb-3" level={5}>
                Metadata
              </Typography.Title>
              <div
                style={{
                  background: "#f6f6f6",
                  padding: 12,
                  borderRadius: 6,
                  fontSize: 13,
                  fontFamily: "monospace",
                  color: "#333",
                  maxHeight: 180,
                  overflow: "auto",
                }}
              >
                {selectedTransaction.metadata
                  ? JSON.stringify(selectedTransaction.metadata, null, 2)
                  : "-"}
              </div>
            </div>
          )}
        </Drawer>
      </Content>
    </Layout>
  );
}
