import {
  Avatar,
  Badge,
  Button,
  Image,
  Progress,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  CheckCircle2,
  Edit,
  Eye,
  ShieldAlert,
  Trash2,
  User as UserIcon,
} from "lucide-react";

const { Text } = Typography;

export default function PostTable({
  posts,
  onView,
  onEdit,
  onModerate,
  onDelete,
}: any) {
  const tagColors: Record<string, string> = {
    "Ẩm thực": "red",
    "Du lịch": "blue",
    "Văn hóa": "purple",
    "Lịch sử": "orange",
    "Nhiếp ảnh": "green",
    Khác: "gray",
  };

  const moderationStatusLabels: Record<
    string,
    { label: string; color: string }
  > = {
    pending: { label: "Pending", color: "orange" },
    approved: { label: "Approved", color: "green" },
    rejected: { label: "Rejected", color: "red" },
    flagged: { label: "Flagged", color: "volcano" },
  };

  const columns = [
    {
      title: "Post",
      key: "post",
      render: (record: any) => (
        <div className="flex items-center space-x-3">
          <Image
            height={60}
            src={record.thumbnail || "/placeholder.svg?height=60&width=80"}
            style={{ objectFit: "cover", borderRadius: 4 }}
            width={80}
          />
          <div className="flex-1">
            <Text strong className="block mb-1">
              {record.title}
            </Text>
            <div className="flex items-center space-x-2 mb-1">
              {record.tag && (
                <Tag color={tagColors[record.tag] || "gray"}>{record.tag}</Tag>
              )}
              <Text className="text-xs" type="secondary">
                ID: {record.id}
              </Text>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span>👁 {record.viewCount}</span>
              <span>❤️ {record.likeCount}</span>
              <span>💬 {record.commentCount}</span>
              <span>📤 {record.shareCount}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Author",
      key: "author",
      render: (record: any) => (
        <div className="flex items-center space-x-2">
          <Avatar
            icon={<UserIcon size={16} />}
            size={32}
            src={record.user.avatar}
          />
          <div>
            <div className="flex items-center space-x-1">
              <Text strong className="text-sm">
                {record.user.fullName}
              </Text>
              {record.user.isVerified && (
                <CheckCircle2 className="text-blue-500 text-xs" size={14} />
              )}
            </div>
            <Text className="text-xs" type="secondary">
              @{record.user.username}
            </Text>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500 text-xs">⭐</span>
              <span className="text-xs">{record.user.reputationScore}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Moderation Status",
      key: "moderation",
      render: (record: any) => (
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Tag color={moderationStatusLabels[record.moderationStatus]?.color}>
              {moderationStatusLabels[record.moderationStatus]?.label}
            </Tag>
            {record.flagCount > 0 && (
              <Badge count={record.flagCount} size="small">
                <ShieldAlert className="text-red-500" size={14} />
              </Badge>
            )}
          </div>
          <div className="mb-2">
            <Text className="text-xs text-gray-500">Risk Level:</Text>
            <Progress
              percent={record.harmfulContentScore * 100}
              showInfo={false}
              size="small"
              strokeColor={
                record.harmfulContentScore > 0.7
                  ? "#ff4d4f"
                  : record.harmfulContentScore > 0.4
                    ? "#faad14"
                    : "#52c41a"
              }
            />
            <Text className="text-xs">
              {record.harmfulContentScore > 0.7
                ? "High"
                : record.harmfulContentScore > 0.4
                  ? "Medium"
                  : "Low"}
            </Text>
          </div>
          {record.moderationReason && (
            <Text className="text-xs block" type="secondary">
              {record.moderationReason}
            </Text>
          )}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <div>
          <div className="text-sm">
            {new Date(date).toLocaleDateString("en-US")}
          </div>
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
        <Space direction="vertical" size="small">
          <Space size="small">
            <Tooltip title="View Details">
              <Button
                icon={<Eye size={16} />}
                size="small"
                type="link"
                onClick={() => onView(record)}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                icon={<Edit size={16} />}
                size="small"
                type="link"
                onClick={() => onEdit(record)}
              />
            </Tooltip>
            <Tooltip title="Moderate">
              <Button
                icon={<ShieldAlert size={16} />}
                size="small"
                type="link"
                onClick={() => onModerate(record)}
              />
            </Tooltip>
          </Space>
          <Space size="small">
            <Tooltip title="Delete">
              <Button
                danger
                icon={<Trash2 size={16} />}
                size="small"
                type="link"
                onClick={() => onDelete(record.id)}
              />
            </Tooltip>
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={posts}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} posts`,
      }}
      rowClassName={(record) => {
        if (record.harmfulContentScore > 0.7) return "bg-red-50";
        if (record.harmfulContentScore > 0.4) return "bg-yellow-50";

        return "";
      }}
      rowKey="id"
    />
  );
}
