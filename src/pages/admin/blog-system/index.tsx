import type { UploadFile, UploadProps } from "antd";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
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

import useBlogCreate from "@/services/hooks/admin/blog/useBlogCreate";
import useBlogPagination from "@/services/hooks/admin/blog/useBlogPagination";
import useBlogUpdate from "@/services/hooks/admin/blog/useBlogUpdate";

const tagOptions = [
  { label: "Cuisine", value: "Cuisine", color: "red" },
  { label: "Travel", value: "Travel", color: "blue" },
  { label: "Transportation", value: "Transportation", color: "green" },
  { label: "Culture", value: "Culture", color: "purple" },
  { label: "History", value: "History", color: "orange" },
  { label: "Shopping", value: "Shopping", color: "cyan" },
];

export default function BlogAdminScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [previewBlog, setPreviewBlog] = useState<any>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const { onUpdate, isLoading: isLoadingUpdate } = useBlogUpdate();
  const { onCreate, isLoading: isLoadingCreate } = useBlogCreate();

  const [where, setWhere] = useState({
    pageSize: 10,
    pageIndex: 1,
  });
  const {
    data: blogs,
    isLoading,
    isRefetching,
    totalViews,
    totalPublished,
    totalDrafts,
  } = useBlogPagination({
    skip: (where.pageIndex - 1) * where.pageSize,
    take: where.pageSize,
    where: {
      title: searchText,
      tag: selectedTag,
      status: selectedStatus,
    },
  });

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
        : []
    );
  };

  const handleDelete = (id: string) => {
    alert();
    const blog = blogs.find((b: any) => b.id === id);

    if (!blog) return;
    onUpdate({
      ...blog,
      isPublish: !blog.isPublish,
    });
  };

  const handlePreview = (blog: any) => {
    setPreviewBlog(blog);
    setIsPreviewVisible(true);
  };

  const handleSubmit = async (values: any) => {
    const thumbnailUrl = fileList[0]?.url || fileList[0]?.response?.url || "";
    const body = {
      ...values,
      thumbnail: thumbnailUrl,
    };

    if (editingBlog) {
      await onUpdate({
        id: editingBlog.id,
        ...body,
      }).then(() => {
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
      });
    } else {
      await onCreate(body).then(() => {
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
      });
    }
  };

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const toggleStatus = (blog: any) => {
    onUpdate({
      ...blog,
      isPublish: !blog.isPublish,
    });
  };

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
                value={totalPublished}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                prefix="📄"
                title="Draft"
                value={totalDrafts}
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
            blogs={blogs}
            isLoading={
              isLoading || isRefetching || isLoadingUpdate || isLoadingCreate
            }
            tagOptions={tagOptions}
            where={where}
            onChangePageSize={(newWhere: any) => {
              setWhere({
                ...where,
                pageSize: newWhere.pageSize,
                pageIndex: newWhere.pageIndex,
              });
            }}
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
          isLoading={isLoadingUpdate || isLoadingCreate}
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
