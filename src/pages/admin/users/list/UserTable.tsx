"use client";

import {
  Avatar,
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  CreditCard,
  Crown,
  Edit,
  Eye,
  Lock,
  Trash2,
  Unlock,
  UserIcon,
} from "lucide-react";

const { Text } = Typography;

export default function UserTable({
  users,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
  isLoading,
  total,
  onChangePageSize,
  where,
}: any) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US");
  };

  const formatPrice = (price: string, currency: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency === "VND" ? "VND" : "USD",
    }).format(Number.parseFloat(price));
  };

  const columns = [
    {
      title: "User",
      key: "user",
      render: (record: any) => (
        <div className="flex items-center space-x-3">
          <Avatar icon={<UserIcon size={20} />} size={40} src={record.avatar} />
          <div>
            <Text strong className="block">
              {record.username}
            </Text>
            <Text className="text-xs" type="secondary">
              {record.email}
            </Text>
            <div className="flex items-center space-x-2 mt-1">
              {record.isAdmin && (
                <Tag color="red" icon={<Crown size={12} />}>
                  Admin
                </Tag>
              )}
              <Tag color={record.isActive ? "green" : "red"}>
                {record.isActive ? "Active" : "Inactive"}
              </Tag>
              {record.userSubscriptionInfo?.isPremium && (
                <Tag color="gold" icon={<CreditCard size={12} />}>
                  Premium
                </Tag>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Subscription",
      key: "subscription",
      render: (record: any) => (
        <div>
          <div className="mb-2">
            <Tag
              color={
                record.userSubscriptionInfo?.subscriptionStatus === "active"
                  ? "green"
                  : record.userSubscriptionInfo?.subscriptionStatus ===
                      "expired"
                    ? "red"
                    : "orange"
              }
            >
              {record.userSubscriptionInfo?.subscriptionStatus?.toUpperCase() ||
                "NONE"}
            </Tag>
          </div>
          {record.userSubscription?.pricingPlan && (
            <div>
              <Text className="text-sm font-medium">
                {record.userSubscription.pricingPlan.name}
              </Text>
              <div className="text-xs text-gray-500">
                {formatPrice(
                  record.userSubscription.pricingPlan.price,
                  record.userSubscription.pricingPlan.currency
                )}{" "}
                / {record.userSubscription.pricingPlan.billingCycle}
              </div>
            </div>
          )}
          {record.userSubscriptionInfo?.subscriptionEndDate && (
            <div className="text-xs text-gray-500 mt-1">
              Expires:{" "}
              {formatDate(record.userSubscriptionInfo.subscriptionEndDate)}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Profile Status",
      key: "profile",
      render: (record: any) => (
        <div>
          <div className="mb-2">
            <Tag color={record.isUpdateDetail ? "green" : "orange"}>
              {record.isUpdateDetail ? "Complete" : "Incomplete"}
            </Tag>
          </div>
          {record.verifyAt && (
            <div className="text-xs text-gray-500">
              Verified: {formatDate(record.verifyAt)}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <div>
          <div>{formatDate(date)}</div>
          <Text className="text-xs" type="secondary">
            {new Date(date).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="View User Details">
            <Button
              icon={<Eye size={16} />}
              type="link"
              onClick={() => onView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit User">
            <Button
              icon={<Edit size={16} />}
              type="link"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip
            title={record.isActive ? "Deactivate User" : "Activate User"}
          >
            <Button
              icon={record.isActive ? <Lock size={16} /> : <Unlock size={16} />}
              type="link"
              onClick={() => onToggleStatus(record)}
            />
          </Tooltip>
          <Popconfirm
            cancelText="Cancel"
            okText="Delete"
            title="Are you sure you want to delete this user?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger icon={<Trash2 size={16} />} type="link" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={isLoading}
      pagination={{
        pageSize: where.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        total: total,
        current: where.pageIndex,
        pageSizeOptions: ["5", "10", "20", "50", "100"],
        onChange: (page, pageSize) => {
          onChangePageSize({
            pageIndex: pageSize == where.pageSize ? page : 1,
            pageSize: pageSize,
          });
        },
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} users`,
      }}
      rowKey="id"
    />
  );
}
