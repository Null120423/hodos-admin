import { Button, Form, Input, Modal, Select, Space, Tag, Upload } from "antd";
import { Upload as UploadIcon } from "lucide-react";
const { TextArea } = Input;

export default function PostModal({
  visible,
  editingPost,
  fileList,
  postForm,
  onCancel,
  onFinish,
  onUploadChange,
  tagOptions,
  analyzeContent,
}: any) {
  return (
    <Modal
      destroyOnClose
      footer={null}
      open={visible}
      title={editingPost ? "Edit Post" : "Create New Post"}
      width={900}
      onCancel={onCancel}
    >
      <Form form={postForm} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter a title!" },
            { max: 255, message: "Title must not exceed 255 characters!" },
          ]}
        >
          <Input placeholder="Enter post title..." />
        </Form.Item>

        <Form.Item label="Tag" name="tag">
          <Select allowClear placeholder="Select a tag for the post">
            {tagOptions.map((option: any) => (
              <Select.Option key={option.value} value={option.value}>
                <Tag color={option.color}>{option.label}</Tag>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Images">
          <Upload
            multiple
            beforeUpload={() => false}
            fileList={fileList}
            listType="picture-card"
            onChange={onUploadChange}
          >
            <div>
              <UploadIcon size={20} />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please enter content!" }]}
        >
          <TextArea
            showCount
            placeholder="Enter post content (HTML supported)..."
            rows={12}
            onChange={(e) => {
              const harmfulScore = analyzeContent(
                e.target.value,
                postForm.getFieldValue("title") || ""
              );

              if (harmfulScore > 0.5) {
                // Optionally show a warning here
              }
            }}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary">
              {editingPost ? "Update" : "Create"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
