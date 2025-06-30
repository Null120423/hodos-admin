import { Badge, Button, Popconfirm, Space, Table, Tag, Typography } from "antd";
import { Edit, Eye, Trash2 } from "lucide-react";

const { Text } = Typography;

export default function PricingPlanTable({
  plans,
  billingCycleOptions,
  onView,
  onEdit,
  onDelete,
  isLoading,
}: any) {
  const columns = [
    {
      title: "Plan",
      key: "plan",
      render: (record: any) => (
        <div>
          <Text strong className="block">
            {record.name}
          </Text>
          <Text className="text-xs" type="secondary">
            {record.planCode}
          </Text>
          <div className="flex items-center space-x-2 mt-1">
            <Tag
              color={
                billingCycleOptions.find(
                  (c: any) => c.value === record.billingCycle,
                )?.color
              }
            >
              {
                billingCycleOptions.find(
                  (c: any) => c.value === record.billingCycle,
                )?.label
              }
            </Tag>
            <Tag color={record.isActive ? "green" : "red"}>
              {record.isActive ? "Active" : "Inactive"}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (record: any) => (
        <div className="text-center">
          <div className="font-semibold text-lg">
            {record.price} {record.currency}
          </div>
          <Text className="text-xs" type="secondary">
            /
            {billingCycleOptions
              .find((c: any) => c.value === record.billingCycle)
              ?.label.toLowerCase()}
          </Text>
        </div>
      ),
    },
    {
      title: "Trial",
      dataIndex: "trialPeriodDays",
      key: "trialPeriodDays",
      width: 100,
      render: (days: number) => (
        <div className="text-center">{days > 0 ? `${days} days` : "None"}</div>
      ),
    },
    {
      title: "Order",
      dataIndex: "displayOrder",
      key: "displayOrder",
      width: 100,
      sorter: (a: any, b: any) => a.displayOrder - b.displayOrder,
    },
    {
      title: "Features",
      key: "features",
      render: (record: any) => (
        <div>
          <Badge showZero count={record.features?.length || 0} />
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
            okText="Delete"
            title="Are you sure you want to delete this plan?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button
              danger
              icon={<Trash2 size={16} />}
              title="Delete"
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
      dataSource={plans}
      loading={isLoading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} plans`,
      }}
      rowKey="id"
    />
  );
}
