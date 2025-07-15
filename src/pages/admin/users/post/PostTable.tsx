import {
  Avatar,
  Badge,
  Button,
  Form,
  Image,
  Input,
  message,
  Popover,
  Progress,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  CheckCircle2,
  Eye,
  LucideFileWarning,
  ShieldAlert,
  UserIcon,
} from "lucide-react";
import React, { useState } from "react";

const { Text } = Typography;
const { TextArea } = Input;

const REJECTION_REASONS = [
  { value: "inappropriate_content", label: "Inappropriate Content" },
  { value: "spam", label: "Spam" },
  { value: "harassment", label: "Harassment" },
  { value: "violence", label: "Violence" },
  { value: "hate_speech", label: "Hate Speech" },
  { value: "misinformation", label: "Misinformation" },
  { value: "copyright_violation", label: "Copyright Violation" },
  { value: "adult_content", label: "Adult Content" },
  { value: "privacy_violation", label: "Privacy Violation" },
  { value: "other", label: "Other" },
];

const RejectPostPopover = ({
  postId,
  onReject,
  trigger,
}: {
  postId: string;
  onReject: (postId: string, reason: string, details: string) => void;
  trigger: React.ReactNode;
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setLoading(true);

      await onReject(postId, values.reason, values.details);

      message.success("Post rejected successfully");
      setOpen(false);
      form.resetFields();
    } catch {
      message.error("Failed to reject post");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const content = (
    <div className="w-96">
      <Form form={form} layout="vertical">
        <Form.Item
          label="Rejection Reason"
          name="reason"
          rules={[{ required: true, message: "Please select a reason" }]}
        >
          <Select placeholder="Select a reason for rejection">
            {REJECTION_REASONS.map((reason) => (
              <Select.Option key={reason.value} value={reason.value}>
                {reason.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Additional Details"
          name="details"
          rules={[
            { required: true, message: "Please provide additional details" },
            { min: 10, message: "Details must be at least 10 characters" },
          ]}
        >
          <TextArea
            showCount
            maxLength={500}
            placeholder="Please provide specific details about why this post is being rejected..."
            rows={4}
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Space className="w-full justify-end">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              danger
              loading={loading}
              type="primary"
              onClick={handleSubmit}
            >
              Reject Post
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <Popover
      content={content}
      open={open}
      placement="leftTop"
      title="Reject Post"
      trigger="click"
      onOpenChange={setOpen}
    >
      {trigger}
    </Popover>
  );
};

export default function PostTable({
  posts,
  onView,
  onDelete,
  total,
  where,
  onChangePageSize,
  isLoading,
}: any) {
  const tagColors: Record<string, string> = {
    "Ẩm thực": "red",
    "Du lịch": "blue",
    "Văn hóa": "purple",
    "Lịch sử": "orange",
    "Nhiếp ảnh": "green",
    Khác: "gray",
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
            <Tag color={record.statusData?.color}>
              {record.statusData?.label}
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
            {record?.isReject && (
              <RejectPostPopover
                postId={record.id}
                trigger={
                  <Tooltip title="Reject Post">
                    <Button
                      danger
                      icon={<LucideFileWarning />}
                      size="small"
                      type="link"
                    />
                  </Tooltip>
                }
                onReject={onDelete}
              />
            )}
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={posts}
      loading={isLoading}
      pagination={{
        total: total,
        defaultPageSize: 5,
        pageSize: where?.pageSize,
        current: where?.pageIndex,
        onChange: (page, pageSize) => {
          onChangePageSize(page, pageSize);
        },
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
