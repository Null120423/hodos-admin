import type { ColumnsType } from "antd/es/table";

import {
  CheckOutlined,
  EyeOutlined,
  LinkOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import { type Notification, NotificationType } from "../type";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Paragraph } = Typography;

// Mock data - replace with actual API calls
const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "user-1",
    user: { id: "user-1", name: "John Doe", email: "john@example.com" },
    scheduledNotificationId: "sched-1",
    title: "Trip Reminder",
    message:
      "Your mountain hiking trip starts tomorrow! Don't forget to pack your gear.",
    isRead: false,
    type: NotificationType.REMINDER,
    sentAt: "2024-12-24T09:00:00Z",
    linkTo: "/trips/trip-123",
    metadata: { tripId: "trip-123", tripName: "Mountain Hike" },
    createdAt: "2024-12-24T09:00:00Z",
    updatedAt: "2024-12-24T09:00:00Z",
  },
  {
    id: "2",
    userId: "user-2",
    user: { id: "user-2", name: "Jane Smith", email: "jane@example.com" },
    title: "New Content Available",
    message:
      "Check out the latest travel guides for your upcoming destinations.",
    isRead: true,
    readAt: "2024-12-23T15:30:00Z",
    type: NotificationType.NEW_CONTENT,
    sentAt: "2024-12-23T14:00:00Z",
    linkTo: "/content/travel-guides",
    createdAt: "2024-12-23T14:00:00Z",
    updatedAt: "2024-12-23T15:30:00Z",
  },
  {
    id: "3",
    userId: "user-1",
    user: { id: "user-1", name: "John Doe", email: "john@example.com" },
    title: "System Alert",
    message: "Your account security settings have been updated.",
    isRead: false,
    type: NotificationType.ALERT,
    sentAt: "2024-12-22T10:15:00Z",
    createdAt: "2024-12-22T10:15:00Z",
    updatedAt: "2024-12-22T10:15:00Z",
  },
];

const typeColors = {
  [NotificationType.INFO]: "blue",
  [NotificationType.REMINDER]: "orange",
  [NotificationType.ALERT]: "red",
  [NotificationType.RECOMMENDATION]: "purple",
  [NotificationType.TRIP_UPDATE]: "green",
  [NotificationType.NEW_CONTENT]: "cyan",
};

const NotificationsList = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [loading, setLoading] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [readFilter, setReadFilter] = useState<boolean | undefined>();
  const [typeFilter, setTypeFilter] = useState<NotificationType | undefined>();
  const [userFilter, setUserFilter] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      !searchText ||
      notification.title.toLowerCase().includes(searchText.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchText.toLowerCase()) ||
      notification.user.name.toLowerCase().includes(searchText.toLowerCase());

    const matchesRead =
      readFilter === undefined || notification.isRead === readFilter;
    const matchesType = !typeFilter || notification.type === typeFilter;
    const matchesUser = !userFilter || notification.userId === userFilter;

    const matchesDate =
      !dateRange ||
      (dayjs(notification.sentAt).isAfter(dateRange[0]) &&
        dayjs(notification.sentAt).isBefore(dateRange[1]));

    return (
      matchesSearch && matchesRead && matchesType && matchesUser && matchesDate
    );
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = async (id: string) => {
    try {
      setLoading(true);
      // API call to mark as read
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                isRead: true,
                readAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : n
        )
      );
      message.success("Notification marked as read");
    } catch (error) {
      message.error("Failed to mark notification as read");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setLoading(true);
      // API call to mark all as read
      const now = new Date().toISOString();

      setNotifications((prev) =>
        prev.map((n) =>
          !n.isRead ? { ...n, isRead: true, readAt: now, updatedAt: now } : n
        )
      );
      message.success("All notifications marked as read");
    } catch (error) {
      message.error("Failed to mark all notifications as read");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDetailModalVisible(true);

    // Mark as read when viewing details
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
  };

  const uniqueUsers = Array.from(new Set(notifications.map((n) => n.user.id)))
    .map((id) => notifications.find((n) => n.user.id === id)?.user)
    .filter(Boolean);

  const columns: ColumnsType<Notification> = [
    {
      title: "Status",
      key: "status",
      width: 60,
      render: (_, record) => (
        <Badge
          status={record.isRead ? "default" : "processing"}
          title={record.isRead ? "Read" : "Unread"}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (title: string, record) => (
        <div>
          <Text strong={!record.isRead}>{title}</Text>
          {record.linkTo && (
            <Tooltip title="Has link">
              <LinkOutlined className="ml-2 text-blue-500" />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "User",
      key: "user",
      width: 150,
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.user.name}</div>
          <div className="text-gray-500 text-sm">{record.user.email}</div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: NotificationType) => (
        <Tag color={typeColors[type]}>{type.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: 300,
      ellipsis: true,
      render: (message: string) => (
        <Text className={message.length > 50 ? "text-gray-600" : ""}>
          {message}
        </Text>
      ),
    },
    {
      title: "Sent At",
      dataIndex: "sentAt",
      key: "sentAt",
      width: 180,
      render: (time: string) => (
        <div>
          <div>{dayjs(time).format("YYYY-MM-DD")}</div>
          <div className="text-gray-500 text-sm">
            {dayjs(time).format("HH:mm")}
          </div>
        </div>
      ),
      sorter: (a, b) => dayjs(a.sentAt).unix() - dayjs(b.sentAt).unix(),
      defaultSortOrder: "descend",
    },
    {
      title: "Read At",
      dataIndex: "readAt",
      key: "readAt",
      width: 180,
      render: (time?: string) =>
        time ? (
          <div>
            <div>{dayjs(time).format("YYYY-MM-DD")}</div>
            <div className="text-gray-500 text-sm">
              {dayjs(time).format("HH:mm")}
            </div>
          </div>
        ) : (
          <Text type="secondary">Not read</Text>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              type="text"
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>

          {!record.isRead && (
            <Tooltip title="Mark as Read">
              <Button
                icon={<CheckOutlined />}
                type="text"
                onClick={() => handleMarkAsRead(record.id)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Text type="secondary">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </Text>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              icon={<CheckOutlined />}
              loading={loading}
              type="primary"
              onClick={handleMarkAllAsRead}
            >
              Mark All as Read
            </Button>
          )}
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Search
            allowClear
            placeholder="Search notifications..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Select
            allowClear
            className="w-full"
            placeholder="Filter by read status"
            value={readFilter}
            onChange={setReadFilter}
          >
            <Option value={true}>Read</Option>
            <Option value={false}>Unread</Option>
          </Select>

          <Select
            allowClear
            className="w-full"
            placeholder="Filter by type"
            value={typeFilter}
            onChange={setTypeFilter}
          >
            {Object.values(NotificationType).map((type) => (
              <Option key={type} value={type}>
                {type.toUpperCase()}
              </Option>
            ))}
          </Select>

          <Select
            allowClear
            showSearch
            className="w-full"
            optionFilterProp="children"
            placeholder="Filter by user"
            value={userFilter}
            onChange={setUserFilter}
          >
            {uniqueUsers.map((user) => (
              <Option key={user!.id} value={user!.id}>
                {user!.name}
              </Option>
            ))}
          </Select>

          <RangePicker
            className="w-full"
            placeholder={["Start date", "End date"]}
            value={dateRange}
            onChange={(val) => {
              if (val && val[0] && val[1]) {
                setDateRange([val[0], val[1]]);
              } else {
                setDateRange(null);
              }
            }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredNotifications}
          loading={loading}
          pagination={{
            total: filteredNotifications.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          rowClassName={(record) => (record.isRead ? "" : "bg-blue-50")}
          rowKey="id"
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            Close
          </Button>,
          selectedNotification?.linkTo && (
            <Button key="navigate" type="primary">
              Go to Link
            </Button>
          ),
        ].filter(Boolean)}
        open={isDetailModalVisible}
        title="Notification Details"
        width={600}
        onCancel={() => setIsDetailModalVisible(false)}
      >
        {selectedNotification && (
          <div className="space-y-4">
            <div>
              <Text strong>Title:</Text>
              <div className="mt-1">{selectedNotification.title}</div>
            </div>

            <div>
              <Text strong>Message:</Text>
              <Paragraph className="mt-1 mb-0">
                {selectedNotification.message}
              </Paragraph>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text strong>Type:</Text>
                <div className="mt-1">
                  <Tag color={typeColors[selectedNotification.type]}>
                    {selectedNotification.type.toUpperCase()}
                  </Tag>
                </div>
              </div>

              <div>
                <Text strong>User:</Text>
                <div className="mt-1">{selectedNotification.user.name}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text strong>Sent At:</Text>
                <div className="mt-1">
                  {dayjs(selectedNotification.sentAt).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                </div>
              </div>

              <div>
                <Text strong>Read At:</Text>
                <div className="mt-1">
                  {selectedNotification.readAt
                    ? dayjs(selectedNotification.readAt).format(
                        "YYYY-MM-DD HH:mm"
                      )
                    : "Not read"}
                </div>
              </div>
            </div>

            {selectedNotification.linkTo && (
              <div>
                <Text strong>Link:</Text>
                <div className="mt-1">
                  <Text code>{selectedNotification.linkTo}</Text>
                </div>
              </div>
            )}

            {selectedNotification.metadata && (
              <div>
                <Text strong>Metadata:</Text>
                <div className="mt-1">
                  <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                    {JSON.stringify(selectedNotification.metadata, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotificationsList;
