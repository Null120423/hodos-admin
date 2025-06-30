import { Button, Form, Input, Modal, Select, Space, Tag, Upload } from "antd";
import JoditEditor from "jodit-react";
import { Upload as UploadIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
export default function BlogModal({
  visible,
  editingBlog,
  form,
  fileList,
  tagOptions,
  onCancel,
  onFinish,
  onUploadChange,
}: any) {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
    }),
    [],
  );

  return (
    <Modal
      destroyOnClose
      footer={null}
      open={visible}
      title={editingBlog ? "Edit Blog" : "Create New Blog"}
      width={800}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter a title!" },
            { max: 255, message: "Title must not exceed 255 characters!" },
          ]}
        >
          <Input placeholder="Enter blog title..." />
        </Form.Item>

        <Form.Item label="Tag" name="tag">
          <Select allowClear placeholder="Select a tag for the blog">
            {tagOptions.map((option: any) => (
              <Select.Option key={option.value} value={option.value}>
                <Tag color={option.color}>{option.label}</Tag>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Thumbnail">
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            listType="picture-card"
            maxCount={1}
            onChange={onUploadChange}
          >
            {fileList.length === 0 && (
              <div>
                <UploadIcon size={20} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please enter content!" }]}
        >
          <JoditEditor
            ref={editor}
            config={config}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {
              // This is just to trigger the onChange event, actual content is managed by onBlur
            }}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary">
              {editingBlog ? "Update" : "Create"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
