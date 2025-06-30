import { Divider, Drawer, Space, Tag, Typography } from "antd";

const { Title } = Typography;

export default function BlogPreviewDrawer({
  visible,
  blog,
  tagOptions,
  onClose,
}: any) {
  return (
    <Drawer
      open={visible}
      placement="right"
      title="Blog Preview"
      width={600}
      onClose={onClose}
    >
      {blog && (
        <div>
          <div className="mb-4">
            <img
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg"
              src={blog.thumbnail || "/placeholder.svg?height=300&width=600"}
            />
          </div>

          <div className="mb-4">
            <Title level={2}>{blog.title}</Title>
            {blog.tag && (
              <Tag
                color={tagOptions.find((t: any) => t.value === blog.tag)?.color}
              >
                {blog.tag}
              </Tag>
            )}
          </div>

          <div className="mb-4 text-gray-500 text-sm">
            <Space split={<Divider type="vertical" />}>
              <span>
                📅 {new Date(blog.createdAt).toLocaleDateString("en-US")}
              </span>
              <span>👁 {blog.views} views</span>
              <span>❤️ {blog.likes} likes</span>
            </Space>
          </div>

          <Divider />

          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="prose max-w-none"
          />
        </div>
      )}
    </Drawer>
  );
}
