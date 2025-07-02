import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Space,
  Tag,
  Upload,
  UploadFile,
} from "antd";
import JoditEditor from "jodit-react";
import { Upload as UploadIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { getBase64 } from "@/lib/utils";
export default function BlogModal({
  visible,
  editingBlog,
  form,
  fileList,
  tagOptions,
  onCancel,
  onFinish,
  onUploadChange,
  isLoading,
}: any) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
    }),
    []
  );
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

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
            accept="image/*"
            action="https://hodos-api.gitlabserver.id.vn/common/upload-image"
            fileList={fileList}
            listType="picture-card"
            maxCount={1}
            onChange={onUploadChange}
            onPreview={handlePreview}
          >
            {fileList.length === 0 && (
              <div className="flex flex-col items-center">
                <UploadIcon size={20} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          {previewImage && (
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
              wrapperStyle={{ display: "none" }}
            />
          )}
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
            onChange={() => {}}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" loading={isLoading} type="primary">
              {editingBlog ? "Update" : "Create"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
