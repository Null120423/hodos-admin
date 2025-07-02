import { Avatar, Card, Col, Divider, Drawer, Row, Tag, Typography } from "antd";
import { Calendar, CreditCard, Shield, UserIcon } from "lucide-react";

const { Title, Text } = Typography;

export default function UserDetailDrawer({ visible, user, onClose }: any) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: string, currency: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency === "VND" ? "VND" : "USD",
    }).format(parseFloat(price));
  };

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
              src={user.avatar}
            />
            <Title className="mt-3 mb-1" level={3}>
              {user.username}
            </Title>
            <Text type="secondary">{user.email}</Text>
            <div className="mt-2">
              {user.isAdmin && <Tag color="red">Admin</Tag>}
              <Tag color={user.isActive ? "green" : "red"}>
                {user.isActive ? "Active" : "Inactive"}
              </Tag>
              {user.userSubscriptionInfo?.isPremium && (
                <Tag color="gold">Premium</Tag>
              )}
            </div>
          </div>

          <Divider>Account Information</Divider>
          <Row className="mb-4" gutter={16}>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>User ID:</Text>
                <div className="text-xs font-mono">{user.id}</div>
              </div>
              <div className="mb-3">
                <Text strong>Username:</Text>
                <div>{user.username}</div>
              </div>
              <div className="mb-3">
                <Text strong>Email:</Text>
                <div>{user.email}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Account Status:</Text>
                <div>
                  <Tag color={user.isActive ? "green" : "red"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Tag>
                </div>
              </div>
              <div className="mb-3">
                <Text strong>Profile Updated:</Text>
                <div>
                  <Tag color={user.isUpdateDetail ? "green" : "orange"}>
                    {user.isUpdateDetail ? "Complete" : "Incomplete"}
                  </Tag>
                </div>
              </div>
              <div className="mb-3">
                <Text strong>Role:</Text>
                <div>
                  <Tag
                    color={user.isAdmin ? "red" : "blue"}
                    icon={
                      user.isAdmin ? (
                        <Shield size={12} />
                      ) : (
                        <UserIcon size={12} />
                      )
                    }
                  >
                    {user.isAdmin ? "Administrator" : "User"}
                  </Tag>
                </div>
              </div>
            </Col>
          </Row>

          <Divider>Subscription Information</Divider>
          {user.userSubscriptionInfo ? (
            <div>
              <Row className="mb-4" gutter={16}>
                <Col span={12}>
                  <div className="mb-3">
                    <Text strong>Subscription Status:</Text>
                    <div>
                      <Tag
                        color={
                          user.userSubscriptionInfo.subscriptionStatus ===
                          "active"
                            ? "green"
                            : user.userSubscriptionInfo.subscriptionStatus ===
                                "expired"
                              ? "red"
                              : "orange"
                        }
                      >
                        {user.userSubscriptionInfo.subscriptionStatus?.toUpperCase()}
                      </Tag>
                    </div>
                  </div>
                  <div className="mb-3">
                    <Text strong>Premium Member:</Text>
                    <div>
                      <Tag
                        color={
                          user.userSubscriptionInfo.isPremium
                            ? "gold"
                            : "default"
                        }
                      >
                        {user.userSubscriptionInfo.isPremium ? "Yes" : "No"}
                      </Tag>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="mb-3">
                    <Text strong>Auto Renew:</Text>
                    <div>
                      <Tag
                        color={
                          user.userSubscriptionInfo.isAutoRenew
                            ? "green"
                            : "red"
                        }
                      >
                        {user.userSubscriptionInfo.isAutoRenew
                          ? "Enabled"
                          : "Disabled"}
                      </Tag>
                    </div>
                  </div>
                  {user.userSubscriptionInfo.subscriptionEndDate && (
                    <div className="mb-3">
                      <Text strong>Expires:</Text>
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>
                          {formatDate(
                            user.userSubscriptionInfo.subscriptionEndDate
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>

              {user.userSubscription?.pricingPlan && (
                <Card className="mb-4" size="small">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text strong>
                        {user.userSubscription.pricingPlan.name}
                      </Text>
                      <div className="text-sm text-gray-500">
                        {user.userSubscription.pricingPlan.billingCycle} billing
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {formatPrice(
                          user.userSubscription.pricingPlan.price,
                          user.userSubscription.pricingPlan.currency
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        per {user.userSubscription.pricingPlan.billingCycle}
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <Text type="secondary">No subscription information available</Text>
          )}

          <Divider>Account Timeline</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Created:</Text>
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span>{formatDate(user.createdAt)}</span>
                </div>
              </div>
              {user.verifyAt && (
                <div className="mb-3">
                  <Text strong>Verified:</Text>
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} />
                    <span>{formatDate(user.verifyAt)}</span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Last Updated:</Text>
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span>{formatDate(user.updatedAt)}</span>
                </div>
              </div>
              {user.userSubscription?.nextPaymentDate && (
                <div className="mb-3">
                  <Text strong>Next Payment:</Text>
                  <div className="flex items-center space-x-2">
                    <CreditCard size={14} />
                    <span>
                      {formatDate(user.userSubscription.nextPaymentDate)}
                    </span>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </Drawer>
  );
}
