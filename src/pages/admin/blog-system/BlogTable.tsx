import { Button, Image, Popconfirm, Space, Table, Tag, Typography } from "antd";
import {
  ArrowDownToLine,
  ArrowUpToLine,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";

const { Text } = Typography;

export default function BlogTable({
  blogs,
  tagOptions,
  onPreview,
  onEdit,
  onDelete,
  onToggleStatus,
}: any) {
  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 100,
      render: (thumbnail: string) => (
        <Image
          height={40}
          src={thumbnail || "/placeholder.svg?height=40&width=60"}
          style={{ objectFit: "cover", borderRadius: 4 }}
          width={60}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string, record: any) => (
        <div>
          <Text strong className="block">
            {title}
          </Text>
          <Text className="text-xs" type="secondary">
            ID: {record.id}
          </Text>
        </div>
      ),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (tag: string) => {
        const tagOption = tagOptions.find(
          (option: any) => option.value === tag,
        );

        return tag ? (
          <Tag color={tagOption?.color}>{tag}</Tag>
        ) : (
          <Text type="secondary">No tag</Text>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <div>
          <Tag color={status === "published" ? "green" : "orange"}>
            {status === "published" ? "Published" : "Draft"}
          </Tag>
          <div className="text-xs text-gray-500 mt-1">
            <div>👁 {record.views} views</div>
            <div>❤️ {record.likes} likes</div>
          </div>
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString("en-US"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString("en-US"),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            icon={<Eye size={16} />}
            title="Preview"
            type="link"
            onClick={() => onPreview(record)}
          />
          <Button
            icon={<Edit size={16} />}
            title="Edit"
            type="link"
            onClick={() => onEdit(record)}
          />
          <Button
            icon={
              record.status === "published" ? (
                <ArrowDownToLine size={16} />
              ) : (
                <ArrowUpToLine size={16} />
              )
            }
            title={record.status === "published" ? "Unpublish" : "Publish"}
            type="link"
            onClick={() => onToggleStatus(record)}
          />
          <Popconfirm
            cancelText="Cancel"
            okText="Delete"
            title="Are you sure you want to delete this blog?"
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
      dataSource={blogs}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} blogs`,
      }}
      rowKey="id"
    />
  );
}
