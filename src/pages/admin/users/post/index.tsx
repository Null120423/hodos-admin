import {
  Button,
  Card,
  Col,
  Input,
  Layout,
  Row,
  Statistic,
  Typography,
} from "antd";
import { AlertTriangle, Clock, Filter, Search } from "lucide-react";
import { Fragment, useState } from "react";

import PostDetailDrawer from "./PostDetailDrawer";
import PostTable from "./PostTable";

import useRejectUserPost from "@/services/hooks/admin/user-post/useRejectUserPost";
import useUserPostPagination from "@/services/hooks/admin/user-post/useUserPostPagination";

const { Content } = Layout;
const { Title } = Typography;

// Mock data for posts with moderation status

export default function PostManagementScreen() {
  const [where, setWhere] = useState({
    pageIndex: 1,
    pageSize: 5,
  });
  const {
    data: posts,
    isLoading,
    total,
  } = useUserPostPagination({
    skip: (where.pageIndex - 1) * where.pageSize,
    take: where.pageSize,
    where: {},
  });
  const [isPostDetailVisible, setIsPostDetailVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const { onUpdate, isLoading: isLoadingUpdate } = useRejectUserPost();

  const handleDeletePost = (
    _postId: string,
    _reason: string,
    _details: string
  ) => {
    onUpdate({
      id: _postId,
      reason: _reason,
      details: _details,
    });
  };

  const handleViewPostDetail = (post: any) => {
    setSelectedPost(post);
    setIsPostDetailVisible(true);
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title className="m-0" level={3}>
          Post & Moderation Management
        </Title>
      </div>

      <Content>
        {/* Statistics */}
        <Row className="mb-2" gutter={16}>
          <Col span={6}>
            <Card className="bg-white/50">
              <Statistic prefix="📝" title="Total Posts" value={total} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-white/50">
              <Statistic
                prefix={<Clock size={16} />}
                title="Pending"
                value={2}
                valueStyle={{ color: "#faad14" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-white/50">
              <Statistic
                prefix={<AlertTriangle size={16} />}
                title="Needs Review"
                value={2}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Alert for high-risk content */}
        {/* {flaggedPosts > 0 && (
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
        )} */}

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
            <Col span={4}>
              <Button
                icon={<Filter size={16} />}
                onClick={() => {
                  setSearchText("");
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
            isLoading={isLoading || isLoadingUpdate}
            posts={posts}
            total={total}
            where={where}
            onChangePageSize={(page: any, pageSize: any) => {
              setWhere({
                ...where,
                pageIndex: page,
                pageSize: pageSize,
              });
            }}
            onDelete={handleDeletePost}
            onView={handleViewPostDetail}
          />
        </Card>

        {/* Post Detail Drawer */}
        <PostDetailDrawer
          post={selectedPost}
          visible={isPostDetailVisible}
          onClose={() => setIsPostDetailVisible(false)}
        />
      </Content>
    </Fragment>
  );
}
