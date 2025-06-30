import { Button, Popconfirm, Space, Table, Tag, Typography } from "antd";
import { Edit, Eye, StopCircle } from "lucide-react";

const { Text } = Typography;

export default function ReceivingBankTable({
  banks,
  currencyOptions,
  onView,
  onEdit,
  onDelete,
  isLoading,
}: any) {
  const columns = [
    {
      title: "Bank",
      key: "bank",
      render: (record: any) => (
        <div>
          <Text strong className="block">
            {record.bankName}
          </Text>
          <Text className="text-xs" type="secondary">
            {record.bankCode}
          </Text>
          <div className="flex items-center space-x-2 mt-1">
            <Tag
              color={
                currencyOptions.find((c: any) => c.value === record.currency)
                  ?.color
              }
            >
              {record.currency}
            </Tag>
            <Tag color={record.isActive ? "green" : "red"}>
              {record.isActive ? "Active" : "Inactive"}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Account Info",
      key: "account",
      render: (record: any) => (
        <div>
          <div className="mb-1">
            <Text strong>Account No:</Text> {record.accountNumber}
          </div>
          <div className="mb-1">
            <Text strong>Holder:</Text> {record.accountHolderName}
          </div>
          {record.branchName && (
            <div>
              <Text strong>Branch:</Text> {record.branchName}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date: string) => (
        <div>
          <div>{new Date(date).toLocaleDateString("en-US")}</div>
          <Text className="text-xs" type="secondary">
            {new Date(date).toLocaleTimeString("en-US")}
          </Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            icon={<Eye size={16} />}
            title="View Details"
            type="link"
            onClick={() => onView(record)}
          />
          <Button
            icon={<Edit size={16} />}
            title="Edit"
            type="link"
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            cancelText="Cancel"
            okText="STOP"
            title="Are you sure you want to STOP this bank?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button
              danger
              icon={<StopCircle size={16} />}
              title="Stop"
              type="link"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={banks}
      loading={isLoading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} banks`,
      }}
      rowKey="id"
    />
  );
}
