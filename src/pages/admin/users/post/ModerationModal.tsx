import {
  Button,
  Form,
  Input,
  Modal,
  Progress,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
const { Text } = Typography;
const { TextArea } = Input;

export default function ModerationModal({
  visible,
  moderatingPost,
  moderationForm,
  onCancel,
  onFinish,
  moderationStatusOptions,
}: any) {
  return (
    <Modal
      destroyOnClose
      footer={null}
      open={visible}
      title="Moderate Post"
      width={600}
      onCancel={onCancel}
    >
      {moderatingPost && (
        <div>
          <div className="mb-4 p-4 bg-gray-50 rounded">
            <Typography.Title level={5}>
              {moderatingPost.title}
            </Typography.Title>
            <Text type="secondary">Author: {moderatingPost.user.fullName}</Text>
            <div className="mt-2">
              <Text className="text-sm">Content Risk Level:</Text>
              <Progress
                className="mb-2"
                percent={moderatingPost.harmfulContentScore * 100}
                strokeColor={
                  moderatingPost.harmfulContentScore > 0.7
                    ? "#ff4d4f"
                    : moderatingPost.harmfulContentScore > 0.4
                      ? "#faad14"
                      : "#52c41a"
                }
              />
              {moderatingPost.flagCount > 0 && (
                <Text className="text-sm" type="danger">
                  Reported {moderatingPost.flagCount} times
                </Text>
              )}
            </div>
          </div>

          <Form form={moderationForm} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Moderation Status"
              name="moderationStatus"
              rules={[{ required: true, message: "Please select a status!" }]}
            >
              <Select placeholder="Select status">
                {moderationStatusOptions.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    <Tag color={option.color}>{option.label}</Tag>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Reason / Note" name="moderationReason">
              <TextArea
                placeholder="Enter moderation reason or note..."
                rows={4}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button htmlType="submit" type="primary">
                  Update
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      )}
    </Modal>
  );
}
