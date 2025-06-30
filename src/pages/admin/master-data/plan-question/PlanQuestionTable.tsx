import { Badge, Button, Popconfirm, Space, Table, Tag, Typography } from "antd";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";

const { Text } = Typography;

export default function PlanQuestionTable({
  questions,
  questionTypeOptions,
  onView,
  onEdit,
  onCreateOption,
  onDelete,
}: any) {
  const columns = [
    {
      title: "Question",
      key: "question",
      render: (record: any) => (
        <div>
          <Text strong className="block">
            {record.question}
          </Text>
          <div className="flex items-center space-x-2 mt-1">
            <Tag
              color={
                questionTypeOptions.find((t: any) => t.value === record.type)
                  ?.color
              }
            >
              {
                questionTypeOptions.find((t: any) => t.value === record.type)
                  ?.label
              }
            </Tag>
            <Tag color={!record.isDeleted ? "green" : "red"}>
              {!record.isDeleted ? "Active" : "Inactive"}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      width: 100,
      sorter: (a: any, b: any) => a.order - b.order,
    },
    {
      title: "Options Count",
      key: "optionsCount",
      textAlign: "center",
      width: 200,
      render: (record: any) => (
        <div className="text-center w-[100%]">
          <Badge showZero count={record?.options?.length} />
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
          <Button
            icon={<Plus size={16} />}
            title="Add Option"
            type="link"
            onClick={() => onCreateOption(record.id)}
          />
          <Popconfirm
            cancelText="Cancel"
            okText="Delete"
            title="Are you sure you want to delete this question?"
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
      dataSource={questions}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} questions`,
      }}
      rowKey="id"
    />
  );
}
