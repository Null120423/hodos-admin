import type { ColumnsType } from "antd/es/table";

import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SendOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { addToast } from "@heroui/react";
import {
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
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

import useCreateSchedule from "@/services/hooks/admin/notification/schedule/useCreateSchedule";
import useDeleteSchedule from "@/services/hooks/admin/notification/schedule/useDeleteSchedule";
import useScheduleNotificationPagination from "@/services/hooks/admin/notification/schedule/useSchedulePagination";
import useSendScheduleNotification from "@/services/hooks/admin/notification/schedule/useSendScheduleNotification";
import useUpdateSchedule from "@/services/hooks/admin/notification/schedule/useUpdateSchedule";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

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
  const { onCreate, isLoading: isLoadingCreate } = useCreateSchedule();
  const { onUpdate, isLoading: isLoadingUpdate } = useUpdateSchedule();
  const { onDelete, isLoading: isLoadingDelete } = useDeleteSchedule();
  const { onSend, isLoading: isLoadingSend } = useSendScheduleNotification();
  const [where, setWhere] = useState({
    pageIndex: 1,
    pageSize: 5,
  });
  const {
    data: schedules,
    total,
    isLoading,
    isRefetching,
  } = useScheduleNotificationPagination({
    skip: (where.pageIndex - 1) * where.pageSize,
    take: where.pageSize,
    where: {
      title: searchText,
      status: statusFilter,
      notificationType: typeFilter,
      scheduledTime: dateRange
        ? {
            gte: dateRange[0].toISOString(),
            lte: dateRange[1].toISOString(),
          }
        : undefined,
    },
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
    const foundSchedule = schedules.find(
      (schedule: { id: string }) => schedule.id === id
    );

    if (!foundSchedule) {
      addToast({
        title: "Notification not found",
        description:
          "The scheduled notification you are trying to delete does not exist.",
        color: "warning",
      });

      return;
    }

    onDelete(id).then(() => {
      addToast({
        title: "Scheduled notification deleted successfully",
        description: `Notification "${foundSchedule.title}" has been deleted.`,
        color: "success",
      });
    });
  };

  const handleStatusChange = async (
    id: string,
    status: ScheduledNotificationStatus
  ) => {
    const foundSchedule = schedules.find(
      (schedule: { id: string }) => schedule.id === id
    );

    if (!foundSchedule) {
      addToast({
        title: "Notification not found",
        description:
          "The scheduled notification you are trying to update does not exist.",
        color: "warning",
      });

      return;
    }
    onUpdate({
      ...foundSchedule,
      status,
    }).then(() => {
      addToast({
        title: `Scheduled notification ${status.toLowerCase()} successfully`,
        description: `Notification "${foundSchedule.title}" has been ${status.toLowerCase()}.`,
        color: "success",
      });
    });
  };

  const handleSendScheduleNotification = async (id: string) => {
    onSend(id)
      .then(() => {
        addToast({
          title: "Scheduled notification sent successfully",
          description: "The notification has been sent to the users.",
          color: "success",
        });
      })
      .catch((error) => {
        addToast({
          title: "Failed to send notification",
          description:
            error.message ||
            "An error occurred while sending the notification.",
          color: "danger",
        });
      });
  };

  const handleFormSubmit = async (values: any) => {
    const body = {
      ...values,
    };

    if (editingNotification) {
      body.id = editingNotification.id;
      onUpdate(body).then(() => {
        addToast({
          title: "Scheduled notification updated successfully",
          description: `Notification "${body.title}" has been updated.`,
          color: "success",
        });
        setIsModalVisible(false);
        setEditingNotification(null);
      });
    } else {
      onCreate(body).then(() => {
        addToast({
          title: "Scheduled notification created successfully",
          description: `Notification "${body.title}" has been created.`,
          color: "success",
        });
        setIsModalVisible(false);
        setEditingNotification(null);
      });
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
      render: (_, record) =>
        record.isAllUser ? "All Users" : record.user?.username || "N/A",
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
          <Tooltip title="Send Now">
            <Button
              icon={<SendOutlined />}
              type="text"
              onClick={() => {
                handleSendScheduleNotification(record.id);
              }}
            />
          </Tooltip>
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
          dataSource={schedules || []}
          loading={
            isLoading ||
            isRefetching ||
            isLoadingDelete ||
            isLoadingUpdate ||
            isLoadingSend
          }
          pagination={{
            current: where.pageIndex,
            onChange: (page, pageSize) => {
              setWhere({
                ...where,
                pageIndex: page,
                pageSize: pageSize || 10,
              });
            },
            pageSizeOptions: ["5", "10", "20", "50", "100"],
            defaultPageSize: 5,
            total: total,
            pageSize: where.pageSize,
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
          loading={isLoading || isLoadingCreate || isLoadingUpdate}
          onCancel={() => setIsModalVisible(false)}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      {isLoading && (
        <div className="flex justify-center items-center w-screen h-screen">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default ScheduledNotificationsList;
