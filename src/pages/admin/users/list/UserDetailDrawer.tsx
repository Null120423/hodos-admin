import { Avatar, Card, Col, Divider, Drawer, Row, Tag, Typography } from "antd";
import { Star, User as UserIcon } from "lucide-react";

const { Title, Text } = Typography;

const tagOptions = [
  { label: "Food", value: "Ẩm thực", color: "red" },
  { label: "Travel", value: "Du lịch", color: "blue" },
  { label: "Culture", value: "Văn hóa", color: "purple" },
  { label: "History", value: "Lịch sử", color: "orange" },
  { label: "Photography", value: "Nhiếp ảnh", color: "green" },
];

export default function UserDetailDrawer({ visible, user, onClose }: any) {
  return (
    <Drawer
      open={visible}
      placement="right"
      title="User Details"
      width={600}
      onClose={onClose}
    >
      {user && (
        <div>
          <div className="text-center mb-6">
            <Avatar
              icon={<UserIcon size={40} />}
              size={100}
              src={user.userDetail?.profilePictureUrl || user.avatar}
            />
            <Title className="mt-3 mb-1" level={3}>
              {user.userDetail?.fullName || user.username}
            </Title>
            <Text type="secondary">@{user.username}</Text>
            <div className="mt-2">
              {user.isAdmin === "true" && <Tag color="red">Admin</Tag>}
              <Tag color={user.isActive ? "green" : "red"}>
                {user.isActive ? "Active" : "Inactive"}
              </Tag>
            </div>
          </div>

          <Divider>Basic Info</Divider>
          <Row className="mb-4" gutter={16}>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Email:</Text>
                <div>{user.email}</div>
              </div>
              <div className="mb-3">
                <Text strong>Phone Number:</Text>
                <div>{user.userDetail?.phoneNumber || "Not updated"}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Birth Date:</Text>
                <div>
                  {user.userDetail?.birthDate
                    ? new Date(user.userDetail.birthDate).toLocaleDateString(
                        "en-US"
                      )
                    : "Not updated"}
                </div>
              </div>
              <div className="mb-3">
                <Text strong>Gender:</Text>
                <div>{user.userDetail?.gender || "Not updated"}</div>
              </div>
            </Col>
          </Row>

          <div className="mb-4">
            <Text strong>Address:</Text>
            <div>{user.userDetail?.address || "Not updated"}</div>
          </div>

          <div className="mb-4">
            <Text strong>Bio:</Text>
            <div>{user.userDetail?.bio || "Not updated"}</div>
          </div>

          <Divider>Travel Info</Divider>
          <Row className="mb-4" gutter={16}>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Interests:</Text>
                <div>{user.userDetail?.travelInterests || "Not updated"}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Languages:</Text>
                <div>{user.userDetail?.languages || "Not updated"}</div>
              </div>
            </Col>
          </Row>

          <div className="mb-4">
            <Text strong>Reputation Score:</Text>
            <div className="flex items-center space-x-2">
              <Star color="#facc15" size={16} />
              <span className="font-semibold">
                {user.userDetail?.reputationScore || 0}
              </span>
            </div>
          </div>

          <Divider>Activity</Divider>
          <Row gutter={16}>
            <Col className="text-center" span={8}>
              <div className="font-semibold text-2xl text-blue-600">
                {user.totalPosts}
              </div>
              <div className="text-gray-500">Posts</div>
            </Col>
            <Col className="text-center" span={8}>
              <div className="font-semibold text-2xl text-red-600">
                {user.totalLikes}
              </div>
              <div className="text-gray-500">Likes</div>
            </Col>
            <Col className="text-center" span={8}>
              <div className="font-semibold text-2xl text-green-600">
                {user.totalComments}
              </div>
              <div className="text-gray-500">Comments</div>
            </Col>
          </Row>

          <Divider>Recent Posts</Divider>
          {user.posts && user.posts.length > 0 ? (
            <div className="space-y-3">
              {user.posts.slice(0, 3).map((post: any) => (
                <Card key={post.id} size="small">
                  <div className="flex items-center space-x-3">
                    <img
                      alt={post.title}
                      className="w-15 h-10 object-cover rounded"
                      src={
                        post.thumbnail || "/placeholder.svg?height=40&width=60"
                      }
                    />
                    <div className="flex-1">
                      <Text strong className="block">
                        {post.title}
                      </Text>
                      <div className="flex items-center space-x-2 mt-1">
                        {post.tag && (
                          <Tag
                            color={
                              tagOptions.find((t) => t.value === post.tag)
                                ?.color
                            }
                          >
                            {tagOptions.find((t) => t.value === post.tag)
                              ?.label || post.tag}
                          </Tag>
                        )}
                        <Text className="text-xs" type="secondary">
                          {post.commentCount} comments
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Text type="secondary">No posts yet</Text>
          )}
        </div>
      )}
    </Drawer>
  );
}
