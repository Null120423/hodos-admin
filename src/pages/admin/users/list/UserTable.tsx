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
  Edit,
  Eye,
  Lock,
  Trash2,
  Unlock,
  User as UserIcon,
} from "lucide-react";

const { Text } = Typography;

export default function UserTable({
  users,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: any) {
  const columns = [
    {
      title: "User",
      key: "user",
      render: (record: any) => (
        <div className="flex items-center space-x-3">
          <Avatar
            icon={<UserIcon size={20} />}
            size={40}
            src={record.avatar || "/placeholder.svg"}
          />
          <div>
            <Text strong className="block">
              {record.userDetail?.fullName || record.username}
            </Text>
            <Text className="text-xs" type="secondary">
              @{record.username}
            </Text>
            <div className="flex items-center space-x-2 mt-1">
              {record.isAdmin === "true" && <Tag color="red">Admin</Tag>}
              <Tag color={record.isActive ? "green" : "red"}>
                {record.isActive ? "Active" : "Inactive"}
              </Tag>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Info",
      key: "contact",
      render: (record: any) => (
        <div>
          <div className="flex items-center space-x-1 mb-1">
            <span>
              <UserIcon size={14} />
            </span>
            <Text className="text-sm">{record.email}</Text>
          </div>
          {record.userDetail?.phoneNumber && (
            <div className="flex items-center space-x-1">
              <span>
                <UserIcon size={14} />
              </span>
              <Text className="text-sm">{record.userDetail.phoneNumber}</Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Activity",
      key: "activity",
      render: (record: any) => (
        <div className="text-center">
          <div className="flex justify-center space-x-4 mb-2">
            <div className="text-center">
              <div className="font-semibold text-blue-600">
                {record.totalPosts}
              </div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-red-600">
                {record.totalLikes}
              </div>
              <div className="text-xs text-gray-500">Likes</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-600">
                {record.totalComments}
              </div>
              <div className="text-xs text-gray-500">Comments</div>
            </div>
          </div>
          {record.userDetail?.reputationScore && (
            <div className="text-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm font-medium">
                {record.userDetail.reputationScore}
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <div>
          <div>{new Date(date).toLocaleDateString("en-US")}</div>
          <Text className="text-xs" type="secondary">
            {new Date(date).toLocaleTimeString("en-US")}
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
              title="View Details"
              type="link"
              onClick={() => onView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit User">
            <Button
              icon={<Edit size={16} />}
              title="Edit"
              type="link"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip
            title={record.isActive ? "Deactivate User" : "Activate User"}
          >
            <Button
              icon={record.isActive ? <Lock size={16} /> : <Unlock size={16} />}
              title={record.isActive ? "Deactivate" : "Activate"}
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
            <Button
              danger
              icon={<Trash2 size={16} />}
              title="Delete"
              type="link"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} users`,
      }}
      rowKey="id"
    />
  );
}
