import type { UploadFile, UploadProps } from "antd";

import {
  Alert,
  Badge,
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
  Tabs,
  Tag,
  Typography,
} from "antd";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileUp,
  Filter,
  Plus,
  Search,
  ShieldAlert,
} from "lucide-react";
import { Fragment, useState } from "react";

import ModerationModal from "./ModerationModal";
import PostDetailDrawer from "./PostDetailDrawer";
import PostModal from "./PostModal";
import PostTable from "./PostTable";
import { mockPosts } from "./_mock";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Mock data for posts with moderation status

const moderationStatusOptions = [
  { label: "Chờ duyệt", value: "pending", color: "orange" },
  { label: "Đã duyệt", value: "approved", color: "green" },
  { label: "Từ chối", value: "rejected", color: "red" },
  { label: "Bị báo cáo", value: "flagged", color: "volcano" },
];

const tagOptions = [
  { label: "Ẩm thực", value: "Ẩm thực", color: "red" },
  { label: "Du lịch", value: "Du lịch", color: "blue" },
  { label: "Văn hóa", value: "Văn hóa", color: "purple" },
  { label: "Lịch sử", value: "Lịch sử", color: "orange" },
  { label: "Nhiếp ảnh", value: "Nhiếp ảnh", color: "green" },
  { label: "Khác", value: "Khác", color: "gray" },
];

// Harmful content detection keywords (simplified)
const harmfulKeywords = [
  "không phù hợp",
  "gây tổn hại",
  "vi phạm",
  "spam",
  "lừa đảo",
  "bạo lực",
  "phân biệt đối xử",
];

export default function PostManagementScreen() {
  const [posts, setPosts] = useState(mockPosts);
  const [activeTab, setActiveTab] = useState("all");
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [isPostDetailVisible, setIsPostDetailVisible] = useState(false);
  const [isModerationModalVisible, setIsModerationModalVisible] =
    useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [moderatingPost, setModeratingPost] = useState<any>(null);
  const [postForm] = Form.useForm();
  const [moderationForm] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  // Content moderation function
  const analyzeContent = (content: string, title: string): number => {
    const text = (content + " " + title).toLowerCase();
    let harmfulScore = 0;

    harmfulKeywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        harmfulScore += 0.2;
      }
    });

    return Math.min(harmfulScore, 1);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setIsPostModalVisible(true);
    postForm.resetFields();
    setFileList([]);
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setIsPostModalVisible(true);
    postForm.setFieldsValue({
      title: post.title,
      tag: post.tag,
      content: post.content,
    });

    const images = post.imgs ? JSON.parse(post.imgs) : [];

    setFileList(
      images.map((img: string, index: number) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: "done",
        url: img,
      })),
    );
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
    message.success("Xóa bài viết thành công!");
  };

  const handleViewPostDetail = (post: any) => {
    setSelectedPost(post);
    setIsPostDetailVisible(true);
  };

  const handleModeratePost = (post: any) => {
    setModeratingPost(post);
    setIsModerationModalVisible(true);
    moderationForm.setFieldsValue({
      moderationStatus: post.moderationStatus,
      moderationReason: post.moderationReason,
    });
  };

  const handleSubmitPost = async (values: any) => {
    try {
      const thumbnailUrl = fileList[0]?.url || fileList[0]?.response?.url || "";
      const imageUrls = fileList
        .map((file) => file.url || file.response?.url)
        .filter(Boolean);

      // Analyze content for harmful material
      const harmfulScore = analyzeContent(values.content, values.title);

      if (editingPost) {
        // Update existing post
        const updatedPosts = posts.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                ...values,
                thumbnail: thumbnailUrl,
                imgs: JSON.stringify(imageUrls),
                harmfulContentScore: harmfulScore,
                moderationStatus:
                  harmfulScore > 0.5 ? "flagged" : post.moderationStatus,
                updatedAt: new Date().toISOString(),
              }
            : post,
        );

        setPosts(updatedPosts);
        message.success("Cập nhật bài viết thành công!");
      } else {
        // Create new post
        const newPost = {
          id: `p${Date.now()}`,
          ...values,
          thumbnail: thumbnailUrl,
          imgs: JSON.stringify(imageUrls),
          timePosted: Math.floor(Date.now() / 1000),
          commentCount: 0,
          userId: "current_user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          moderationStatus: harmfulScore > 0.5 ? "flagged" : "pending",
          moderationReason:
            harmfulScore > 0.5 ? "Phát hiện nội dung có thể gây hại" : null,
          moderatedBy: null,
          moderatedAt: null,
          harmfulContentScore: harmfulScore,
          flagCount: 0,
          isPublished: false,
          viewCount: 0,
          likeCount: 0,
          shareCount: 0,
          user: {
            id: "current_user",
            username: "admin",
            fullName: "Quản trị viên",
            avatar: "/placeholder.svg",
            isVerified: true,
            reputationScore: 5.0,
          },
        };

        setPosts([newPost, ...posts]);
        message.success("Tạo bài viết thành công!");

        if (harmfulScore > 0.5) {
          message.warning(
            "Bài viết được đánh dấu cần kiểm duyệt do phát hiện nội dung có thể gây hại!",
          );
        }
      }

      setIsPostModalVisible(false);
      postForm.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleSubmitModeration = async (values: any) => {
    try {
      const updatedPosts = posts.map((post) =>
        post.id === moderatingPost.id
          ? {
              ...post,
              moderationStatus: values.moderationStatus,
              moderationReason: values.moderationReason,
              moderatedBy: "current_admin",
              moderatedAt: new Date().toISOString(),
              isPublished: values.moderationStatus === "approved",
            }
          : post,
      );

      setPosts(updatedPosts);
      setIsModerationModalVisible(false);
      moderationForm.resetFields();
      message.success("Cập nhật trạng thái kiểm duyệt thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      post.content.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      !selectedStatus || post.moderationStatus === selectedStatus;
    const matchesTag = !selectedTag || post.tag === selectedTag;

    // Tab filtering
    if (activeTab === "pending") return post.moderationStatus === "pending";
    if (activeTab === "flagged")
      return (
        post.moderationStatus === "flagged" || post.harmfulContentScore > 0.5
      );
    if (activeTab === "approved") return post.moderationStatus === "approved";
    if (activeTab === "rejected") return post.moderationStatus === "rejected";

    return matchesSearch && matchesStatus && matchesTag;
  });

  const totalPosts = posts.length;
  const pendingPosts = posts.filter(
    (p) => p.moderationStatus === "pending",
  ).length;
  const flaggedPosts = posts.filter(
    (p) => p.moderationStatus === "flagged" || p.harmfulContentScore > 0.5,
  ).length;
  const approvedPosts = posts.filter(
    (p) => p.moderationStatus === "approved",
  ).length;
  const rejectedPosts = posts.filter(
    (p) => p.moderationStatus === "rejected",
  ).length;

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title className="m-0" level={3}>
          Post & Moderation Management
        </Title>
        <Space>
          <Button icon={<FileUp size={16} />}>Export Report</Button>
          <Button
            icon={<Plus size={16} />}
            type="primary"
            onClick={handleCreatePost}
          >
            Create New Post
          </Button>
        </Space>
      </div>

      <Content>
        {/* Statistics */}
        <Row className="mb-2" gutter={16}>
          <Col span={6}>
            <Card className="bg-white/50">
              <Statistic prefix="📝" title="Total Posts" value={totalPosts} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-white/50">
              <Statistic
                prefix={<Clock size={16} />}
                title="Pending"
                value={pendingPosts}
                valueStyle={{ color: "#faad14" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-white/50">
              <Statistic
                prefix={<AlertTriangle size={16} />}
                title="Needs Review"
                value={flaggedPosts}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-white/50">
              <Statistic
                prefix={<CheckCircle2 size={16} />}
                title="Approved"
                value={approvedPosts}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Alert for high-risk content */}
        {flaggedPosts > 0 && (
          <Alert
            showIcon
            action={
              <Button size="small" onClick={() => setActiveTab("flagged")}>
                View Now
              </Button>
            }
            className="mb-6"
            description={`There are ${flaggedPosts} posts that need moderation due to potentially harmful or violating content.`}
            icon={<ShieldAlert size={16} />}
            message="Content Warning"
            type="warning"
          />
        )}

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            key="all"
            tab={
              <span>
                📋 All
                <Badge count={totalPosts} style={{ marginLeft: 8 }} />
              </span>
            }
          />
          <TabPane
            key="pending"
            tab={
              <span>
                ⏳ Pending
                <Badge count={pendingPosts} style={{ marginLeft: 8 }} />
              </span>
            }
          />
          <TabPane
            key="flagged"
            tab={
              <span>
                ⚠️ Needs Review
                <Badge count={flaggedPosts} style={{ marginLeft: 8 }} />
              </span>
            }
          />
          <TabPane
            key="approved"
            tab={
              <span>
                ✅ Approved
                <Badge count={approvedPosts} style={{ marginLeft: 8 }} />
              </span>
            }
          />
          <TabPane
            key="rejected"
            tab={
              <span>
                ❌ Rejected
                <Badge count={rejectedPosts} style={{ marginLeft: 8 }} />
              </span>
            }
          />
        </Tabs>

        {/* Filters */}
        <Card className="mb-6">
          <Row gutter={16}>
            <Col span={8}>
              <Input
                allowClear
                placeholder="Search posts, author..."
                prefix={<Search size={16} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                allowClear
                placeholder="Filter by status"
                style={{ width: "100%" }}
                value={selectedStatus}
                onChange={setSelectedStatus}
              >
                {moderationStatusOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    <Tag color={option.color}>{option.label}</Tag>
                  </Select.Option>
                ))}
              </Select>
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
            <Col span={4}>
              <Button
                icon={<Filter size={16} />}
                onClick={() => {
                  setSearchText("");
                  setSelectedStatus(undefined);
                  setSelectedTag(undefined);
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Posts Table */}
        <Card>
          <PostTable
            posts={filteredPosts}
            onDelete={handleDeletePost}
            onEdit={handleEditPost}
            onModerate={handleModeratePost}
            onView={handleViewPostDetail}
          />
        </Card>

        {/* Post Create/Edit Modal */}
        <PostModal
          analyzeContent={analyzeContent}
          editingPost={editingPost}
          fileList={fileList}
          postForm={postForm}
          tagOptions={tagOptions}
          visible={isPostModalVisible}
          onCancel={() => setIsPostModalVisible(false)}
          onFinish={handleSubmitPost}
          onUploadChange={handleUploadChange}
        />

        {/* Moderation Modal */}
        <ModerationModal
          moderatingPost={moderatingPost}
          moderationForm={moderationForm}
          moderationStatusOptions={moderationStatusOptions}
          visible={isModerationModalVisible}
          onCancel={() => setIsModerationModalVisible(false)}
          onFinish={handleSubmitModeration}
        />

        {/* Post Detail Drawer */}
        <PostDetailDrawer
          moderationStatusOptions={moderationStatusOptions}
          post={selectedPost}
          tagOptions={tagOptions}
          visible={isPostDetailVisible}
          onClose={() => setIsPostDetailVisible(false)}
          onEdit={handleEditPost}
          onModerate={handleModeratePost}
        />
      </Content>
    </Fragment>
  );
}
