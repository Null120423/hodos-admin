import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Image,
  Row,
  Tag,
  Typography,
} from "antd";
import { CheckCircle2, ShieldAlert, User as UserIcon } from "lucide-react";

const { Title, Text } = Typography;

export default function PostDetailDrawer({
  visible,
  post,
  onClose,
  onEdit,
  onModerate,
  tagOptions,
  moderationStatusOptions,
}: any) {
  return (
    <Drawer
      open={visible}
      placement="right"
      title="Post Details"
      width={700}
      onClose={onClose}
    >
      {post && (
        <div>
          {/* Post Header */}
          <div className="mb-6">
            <Title level={2}>{post.title}</Title>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar
                  icon={<UserIcon size={20} />}
                  size={40}
                  src={post.user.avatar}
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <Text strong>{post.user.fullName}</Text>
                    {post.user.isVerified && (
                      <CheckCircle2 className="text-blue-500" size={16} />
                    )}
                  </div>
                  <Text className="text-sm" type="secondary">
                    @{post.user.username}
                  </Text>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("en-US")}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleTimeString("en-US")}
                </div>
              </div>
            </div>

            {/* Tags and Status */}
            <div className="flex items-center space-x-2 mb-4">
              {post.tag && (
                <Tag
                  color={
                    tagOptions.find((t: any) => t.value === post.tag)?.color
                  }
                >
                  {post.tag}
                </Tag>
              )}
              <Tag
                color={
                  moderationStatusOptions.find(
                    (s: any) => s.value === post.moderationStatus
                  )?.color
                }
              >
                {
                  moderationStatusOptions.find(
                    (s: any) => s.value === post.moderationStatus
                  )?.label
                }
              </Tag>
              {post.isPublished && <Tag color="green">Published</Tag>}
            </div>

            {/* Engagement Stats */}
            <Row className="mb-4" gutter={16}>
              <Col className="text-center" span={6}>
                <div className="text-lg font-semibold text-blue-600">
                  {post.viewCount}
                </div>
                <div className="text-xs text-gray-500">Views</div>
              </Col>
              <Col className="text-center" span={6}>
                <div className="text-lg font-semibold text-red-600">
                  {post.likeCount}
                </div>
                <div className="text-xs text-gray-500">Likes</div>
              </Col>
              <Col className="text-center" span={6}>
                <div className="text-lg font-semibold text-green-600">
                  {post.commentCount}
                </div>
                <div className="text-xs text-gray-500">Comments</div>
              </Col>
              <Col className="text-center" span={6}>
                <div className="text-lg font-semibold text-purple-600">
                  {post.shareCount}
                </div>
                <div className="text-xs text-gray-500">Shares</div>
              </Col>
            </Row>
          </div>

          {/* Moderation Info */}
          <Card className="mb-6" title="Moderation Info">
            <div className="space-y-3">
              <div>
                <Text strong>Content Risk Level:</Text>
                <Divider style={{ margin: "8px 0" }} />
                <Badge
                  count={post.flagCount}
                  offset={[10, 0]}
                  style={{ backgroundColor: "#ff4d4f" }}
                >
                  <ShieldAlert className="mr-2" size={16} />
                </Badge>
                <span>
                  {post.harmfulContentScore > 0.7
                    ? "High - Needs immediate review"
                    : post.harmfulContentScore > 0.4
                      ? "Medium - Monitor"
                      : "Low - Safe"}
                </span>
              </div>

              {post.flagCount > 0 && (
                <div>
                  <Text strong>Reported: </Text>
                  <Badge count={post.flagCount} />
                </div>
              )}

              {post.moderationReason && (
                <div>
                  <Text strong>Moderation Reason:</Text>
                  <div className="mt-1 p-2 bg-gray-50 rounded">
                    {post.moderationReason}
                  </div>
                </div>
              )}

              {post.moderatedBy && (
                <div>
                  <Text strong>Moderated by:</Text>
                  <Text className="ml-2">{post.moderatedBy}</Text>
                  <Text className="ml-2 text-sm" type="secondary">
                    at {new Date(post.moderatedAt).toLocaleString("en-US")}
                  </Text>
                </div>
              )}
            </div>
          </Card>

          {/* Images */}
          {post.imgs && JSON.parse(post.imgs).length > 0 && (
            <div className="mb-6">
              <Title level={5}>Images</Title>
              <div className="grid grid-cols-2 gap-4">
                {JSON.parse(post.imgs).map((img: string, index: number) => (
                  <Image
                    key={index}
                    alt={`Image ${index + 1}`}
                    className="rounded"
                    src={img || "/placeholder.svg"}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="mb-6">
            <Title level={5}>Content</Title>
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose max-w-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button onClick={() => onModerate(post)}>Moderate</Button>
            <Button type="primary" onClick={() => onEdit(post)}>
              Edit
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
