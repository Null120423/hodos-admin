import type { UploadFile, UploadProps } from "antd";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import { FileUp, Filter, Plus, Search } from "lucide-react";
import { useState } from "react";

import BlogModal from "./BlogModal";
import BlogPreviewDrawer from "./BlogPreviewDrawer";
import BlogTable from "./BlogTable";

// Mock data for blogs
const mockBlogs = [
  {
    id: "1",
    title: "Khám phá ẩm thực đường phố Sài Gòn",
    thumbnail:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
    tag: "Ẩm thực",
    content: `
      <h2>Giới thiệu về ẩm thực đường phố Sài Gòn</h2>
      <p>Sài Gòn nổi tiếng với nền ẩm thực đường phố phong phú và đa dạng. Từ những món ăn truyền thống như phở, bánh mì đến các món ăn vặt độc đáo, thành phố này luôn mang đến những trải nghiệm ẩm thực tuyệt vời.</p>
      
      <h3>Những món ăn không thể bỏ qua</h3>
      <ul>
        <li><strong>Phở:</strong> Món ăn quốc hồn quốc túy của Việt Nam</li>
        <li><strong>Bánh mì:</strong> Sự kết hợp hoàn hảo giữa Đông và Tây</li>
        <li><strong>Bún bò Huế:</strong> Hương vị đậm đà từ cố đô</li>
        <li><strong>Bánh xèo:</strong> Món ăn dân dã nhưng hấp dẫn</li>
      </ul>
      
      <p>Mỗi món ăn đều mang trong mình một câu chuyện riêng, phản ánh văn hóa và lịch sử của vùng đất Nam Bộ.</p>
    `,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    status: "published",
    views: 1250,
    likes: 89,
  },
  {
    id: "2",
    title: "Top 10 địa điểm du lịch hấp dẫn tại TP.HCM",
    thumbnail:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=300&h=200&fit=crop",
    tag: "Du lịch",
    content: `
      <h2>Khám phá những địa điểm du lịch nổi tiếng</h2>
      <p>Thành phố Hồ Chí Minh không chỉ là trung tâm kinh tế mà còn là điểm đến du lịch hấp dẫn với nhiều địa điểm thú vị.</p>
      
      <h3>Danh sách các địa điểm nổi bật</h3>
      <ol>
        <li>Chợ Bến Thành - Biểu tượng của Sài Gòn</li>
        <li>Dinh Độc Lập - Chứng tích lịch sử</li>
        <li>Nhà thờ Đức Bà - Kiến trúc Gothic tuyệt đẹp</li>
        <li>Phố đi bộ Nguyễn Huệ - Không gian giải trí hiện đại</li>
        <li>Bảo tàng Chứng tích Chiến tranh - Bài học lịch sử</li>
      </ol>
    `,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:20:00Z",
    status: "published",
    views: 2100,
    likes: 156,
  },
  {
    id: "3",
    title: "Hướng dẫn di chuyển bằng xe buýt tại Sài Gòn",
    thumbnail:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop",
    tag: "Giao thông",
    content: `
      <h2>Hệ thống xe buýt công cộng Sài Gòn</h2>
      <p>Xe buýt là phương tiện giao thông công cộng tiện lợi và kinh tế để di chuyển trong thành phố.</p>
      
      <h3>Các tuyến xe buýt chính</h3>
      <p>Hệ thống xe buýt Sài Gòn có hơn 100 tuyến khác nhau, kết nối các quận huyện trong thành phố.</p>
    `,
    createdAt: "2024-01-05T14:20:00Z",
    updatedAt: "2024-01-12T11:30:00Z",
    status: "draft",
    views: 450,
    likes: 23,
  },
];

const tagOptions = [
  { label: "Cuisine", value: "Cuisine", color: "red" },
  { label: "Travel", value: "Travel", color: "blue" },
  { label: "Transportation", value: "Transportation", color: "green" },
  { label: "Culture", value: "Culture", color: "purple" },
  { label: "History", value: "History", color: "orange" },
  { label: "Shopping", value: "Shopping", color: "cyan" },
];

export default function BlogAdminScreen() {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [previewBlog, setPreviewBlog] = useState<any>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const handleCreate = () => {
    setEditingBlog(null);
    setIsModalVisible(true);
    form.resetFields();
    setFileList([]);
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setIsModalVisible(true);
    form.setFieldsValue({
      title: blog.title,
      tag: blog.tag,
      content: blog.content,
    });
    setFileList(
      blog.thumbnail
        ? [
            {
              uid: "-1",
              name: "thumbnail.jpg",
              status: "done",
              url: blog.thumbnail,
            },
          ]
        : [],
    );
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    message.success("Xóa bài viết thành công!");
  };

  const handlePreview = (blog: any) => {
    setPreviewBlog(blog);
    setIsPreviewVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      const thumbnailUrl = fileList[0]?.url || fileList[0]?.response?.url || "";

      if (editingBlog) {
        // Update existing blog
        const updatedBlogs = blogs.map((blog) =>
          blog.id === editingBlog.id
            ? {
                ...blog,
                ...values,
                thumbnail: thumbnailUrl,
                updatedAt: new Date().toISOString(),
              }
            : blog,
        );

        setBlogs(updatedBlogs);
        message.success("Cập nhật bài viết thành công!");
      } else {
        // Create new blog
        const newBlog = {
          id: Date.now().toString(),
          ...values,
          thumbnail: thumbnailUrl,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: "draft",
          views: 0,
          likes: 0,
        };

        setBlogs([newBlog, ...blogs]);
        message.success("Tạo bài viết thành công!");
      }

      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const toggleStatus = (blog: any) => {
    const updatedBlogs = blogs.map((b) =>
      b.id === blog.id
        ? {
            ...b,
            status: b.status === "published" ? "draft" : "published",
            updatedAt: new Date().toISOString(),
          }
        : b,
    );

    setBlogs(updatedBlogs);
    message.success(
      `${blog.status === "published" ? "Ẩn" : "Xuất bản"} bài viết thành công!`,
    );
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesTag = !selectedTag || blog.tag === selectedTag;
    const matchesStatus = !selectedStatus || blog.status === selectedStatus;

    return matchesSearch && matchesTag && matchesStatus;
  });

  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  const publishedCount = blogs.filter(
    (blog) => blog.status === "published",
  ).length;
  const draftCount = blogs.filter((blog) => blog.status === "draft").length;

  return (
    <Layout className="min-h-screen">
      <Layout.Header className="bg-white shadow-sm border-b">
        <div className="flex justify-between items-center">
          <Typography.Title className="m-0" level={3}>
            Blog Management
          </Typography.Title>
          <Space>
            <Button icon={<FileUp size={16} />}>Export Data</Button>
            <Button
              icon={<Plus size={16} />}
              type="primary"
              onClick={handleCreate}
            >
              Create New Blog
            </Button>
          </Space>
        </div>
      </Layout.Header>

      <Layout.Content className="p-6 bg-gray-50">
        {/* Statistics */}
        <Row className="mb-6" gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic prefix="📝" title="Total Blogs" value={blogs.length} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                prefix="✅"
                title="Published"
                value={publishedCount}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                prefix="📄"
                title="Draft"
                value={draftCount}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic prefix="👁" title="Total Views" value={totalViews} />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6">
          <Row gutter={16}>
            <Col span={8}>
              <Input
                allowClear
                placeholder="Search by title..."
                prefix={<Search size={16} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                allowClear
                placeholder="Filter by tag"
                style={{ width: "100%" }}
                value={selectedTag}
                onChange={setSelectedTag}
              >
                {tagOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    <Tag color={option.color}>{option.label}</Tag>
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                allowClear
                placeholder="Filter by status"
                style={{ width: "100%" }}
                value={selectedStatus}
                onChange={setSelectedStatus}
              >
                <Select.Option value="published">
                  <Tag color="green">Published</Tag>
                </Select.Option>
                <Select.Option value="draft">
                  <Tag color="orange">Draft</Tag>
                </Select.Option>
              </Select>
            </Col>
            <Col span={4}>
              <Button
                icon={<Filter size={16} />}
                onClick={() => {
                  setSearchText("");
                  setSelectedTag(undefined);
                  setSelectedStatus(undefined);
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Blog Table */}
        <Card>
          <BlogTable
            blogs={filteredBlogs}
            tagOptions={tagOptions}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onPreview={handlePreview}
            onToggleStatus={toggleStatus}
          />
        </Card>

        {/* Create/Edit Modal */}
        <BlogModal
          editingBlog={editingBlog}
          fileList={fileList}
          form={form}
          tagOptions={tagOptions}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onFinish={handleSubmit}
          onUploadChange={handleUploadChange}
        />

        {/* Preview Drawer */}
        <BlogPreviewDrawer
          blog={previewBlog}
          tagOptions={tagOptions}
          visible={isPreviewVisible}
          onClose={() => setIsPreviewVisible(false)}
        />
      </Layout.Content>
    </Layout>
  );
}
