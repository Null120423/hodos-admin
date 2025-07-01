import type { ColumnsType } from "antd/es/table";

import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import {
  NotificationChannel,
  NotificationType,
  ScheduledNotification,
  ScheduledNotificationStatus,
} from "../type";

import { ScheduledNotificationForm } from "./form";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data - replace with actual API calls
const mockScheduledNotifications: ScheduledNotification[] = [
  {
    id: "1",
    userId: "user-1",
    user: { id: "user-1", name: "John Doe", email: "john@example.com" },
    title: "Trip Reminder",
    message: "Your mountain hiking trip starts tomorrow!",
    notificationType: NotificationType.REMINDER,
    channels: [NotificationChannel.EMAIL, NotificationChannel.PUSH],
    scheduledTime: "2024-12-25T09:00:00Z",
    status: ScheduledNotificationStatus.PENDING,
    retryAttempts: 0,
    createdAt: "2024-12-20T10:00:00Z",
    updatedAt: "2024-12-20T10:00:00Z",
  },
  {
    id: "2",
    title: "System Maintenance",
    message: "Scheduled maintenance will begin in 1 hour",
    notificationType: NotificationType.ALERT,
    channels: [NotificationChannel.IN_APP],
    scheduledTime: "2024-12-24T02:00:00Z",
    status: ScheduledNotificationStatus.SENT,
    processedAt: "2024-12-24T02:00:00Z",
    retryAttempts: 0,
    createdAt: "2024-12-23T10:00:00Z",
    updatedAt: "2024-12-24T02:00:00Z",
  },
];

const statusColors = {
  [ScheduledNotificationStatus.PENDING]: "blue",
  [ScheduledNotificationStatus.PROCESSING]: "orange",
  [ScheduledNotificationStatus.SENT]: "green",
  [ScheduledNotificationStatus.FAILED]: "red",
  [ScheduledNotificationStatus.CANCELLED]: "gray",
};

const typeColors = {
  [NotificationType.INFO]: "blue",
  [NotificationType.REMINDER]: "orange",
  [NotificationType.ALERT]: "red",
  [NotificationType.RECOMMENDATION]: "purple",
  [NotificationType.TRIP_UPDATE]: "green",
  [NotificationType.NEW_CONTENT]: "cyan",
};

const ScheduledNotificationsList = () => {
  const [notifications, setNotifications] = useState<ScheduledNotification[]>(
    mockScheduledNotifications
  );
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNotification, setEditingNotification] =
    useState<ScheduledNotification | null>(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    ScheduledNotificationStatus | undefined
  >();
  const [typeFilter, setTypeFilter] = useState<NotificationType | undefined>();
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      !searchText ||
      notification.title.toLowerCase().includes(searchText.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchText.toLowerCase()) ||
      notification.user?.name.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = !statusFilter || notification.status === statusFilter;
    const matchesType =
      !typeFilter || notification.notificationType === typeFilter;

    const matchesDate =
      !dateRange ||
      (dayjs(notification.scheduledTime).isAfter(dateRange[0]) &&
        dayjs(notification.scheduledTime).isBefore(dateRange[1]));

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const handleCreate = () => {
    setEditingNotification(null);
    setIsModalVisible(true);
  };

  const handleEdit = (notification: ScheduledNotification) => {
    setEditingNotification(notification);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      // API call to delete
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      message.success("Scheduled notification deleted successfully");
    } catch (error) {
      message.error("Failed to delete scheduled notification");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    id: string,
    status: ScheduledNotificationStatus
  ) => {
    try {
      setLoading(true);
      // API call to update status
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, status, updatedAt: new Date().toISOString() }
            : n
        )
      );
      message.success(`Notification ${status} successfully`);
    } catch (error) {
      message.error("Failed to update notification status");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (editingNotification) {
        // Update existing
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === editingNotification.id
              ? { ...n, ...values, updatedAt: new Date().toISOString() }
              : n
          )
        );
        message.success("Scheduled notification updated successfully");
      } else {
        // Create new
        const newNotification: ScheduledNotification = {
          id: Date.now().toString(),
          ...values,
          status: ScheduledNotificationStatus.PENDING,
          retryAttempts: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setNotifications((prev) => [newNotification, ...prev]);
        message.success("Scheduled notification created successfully");
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save scheduled notification");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<ScheduledNotification> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
      ellipsis: true,
    },
    {
      title: "User",
      key: "user",
      width: 150,
      render: (_, record) => record.user?.name || "All Users",
    },
    {
      title: "Type",
      dataIndex: "notificationType",
      key: "type",
      width: 120,
      render: (type: NotificationType) => (
        <Tag color={typeColors[type]}>{type.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Channels",
      dataIndex: "channels",
      key: "channels",
      width: 150,
      render: (channels: NotificationChannel[]) => (
        <Space wrap>
          {channels.map((channel) => (
            <Tag key={channel}>{channel.toUpperCase()}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Scheduled Time",
      dataIndex: "scheduledTime",
      key: "scheduledTime",
      width: 180,
      render: (time: string) => dayjs(time).format("YYYY-MM-DD HH:mm"),
      sorter: (a, b) =>
        dayjs(a.scheduledTime).unix() - dayjs(b.scheduledTime).unix(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: ScheduledNotificationStatus) => (
        <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Retry Attempts",
      dataIndex: "retryAttempts",
      key: "retryAttempts",
      width: 100,
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              disabled={record.status === ScheduledNotificationStatus.SENT}
              icon={<EditOutlined />}
              type="text"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          {record.status === ScheduledNotificationStatus.PENDING && (
            <Tooltip title="Cancel">
              <Button
                icon={<StopOutlined />}
                type="text"
                onClick={() =>
                  handleStatusChange(
                    record.id,
                    ScheduledNotificationStatus.CANCELLED
                  )
                }
              />
            </Tooltip>
          )}

          {record.status === ScheduledNotificationStatus.CANCELLED && (
            <Tooltip title="Reactivate">
              <Button
                icon={<PlayCircleOutlined />}
                type="text"
                onClick={() =>
                  handleStatusChange(
                    record.id,
                    ScheduledNotificationStatus.PENDING
                  )
                }
              />
            </Tooltip>
          )}

          {record.status === ScheduledNotificationStatus.FAILED && (
            <Tooltip title="Retry">
              <Button
                icon={<ReloadOutlined />}
                type="text"
                onClick={() =>
                  handleStatusChange(
                    record.id,
                    ScheduledNotificationStatus.PENDING
                  )
                }
              />
            </Tooltip>
          )}

          <Popconfirm
            cancelText="No"
            okText="Yes"
            title="Are you sure you want to delete this scheduled notification?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} type="text" />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Scheduled Notifications</h1>
          <Button icon={<PlusOutlined />} type="primary" onClick={handleCreate}>
            Create Notification
          </Button>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
          >
            {Object.values(ScheduledNotificationStatus).map((status) => (
              <Option key={status} value={status}>
                {status.toUpperCase()}
              </Option>
            ))}
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
          rowKey="id"
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        destroyOnClose
        footer={null}
        open={isModalVisible}
        title={
          editingNotification
            ? "Edit Scheduled Notification"
            : "Create Scheduled Notification"
        }
        width={800}
        onCancel={() => setIsModalVisible(false)}
      >
        <ScheduledNotificationForm
          initialValues={editingNotification}
          loading={loading}
          onCancel={() => setIsModalVisible(false)}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default ScheduledNotificationsList;
