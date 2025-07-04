import type { ColumnsType } from "antd/es/table";

import { EyeOutlined, LinkOutlined, SearchOutlined } from "@ant-design/icons";
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
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import { type Notification, NotificationType } from "../type";

import JSONView from "./json-v";

import useNotificationPagination from "@/services/hooks/admin/notification/useNotificationPagination";
import useUserSelectBox from "@/services/hooks/admin/user/useSelectBox";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Paragraph } = Typography;

const typeColors = {
  [NotificationType.INFO]: "blue",
  [NotificationType.REMINDER]: "orange",
  [NotificationType.ALERT]: "red",
  [NotificationType.RECOMMENDATION]: "purple",
  [NotificationType.TRIP_UPDATE]: "green",
  [NotificationType.NEW_CONTENT]: "cyan",
};

const NotificationsList = () => {
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

  const { data: users } = useUserSelectBox();
  const [where, setWhere] = useState({
    pageIndex: 1,
    pageSize: 5,
  });
  const {
    data: notifications,
    unreadCount,
    isLoading,
    isRefetching,
    total,
  } = useNotificationPagination({
    skip: (where.pageIndex - 1) * where.pageSize,
    take: where.pageSize,
    where: {
      isRead: readFilter,
      type: typeFilter,
      userId: userFilter,
      sentAt: dateRange
        ? {
            gte: dateRange[0].startOf("day").toISOString(),
            lte: dateRange[1].endOf("day").toISOString(),
          }
        : undefined,
      title: searchText ? { contains: searchText } : undefined,
      message: searchText ? { contains: searchText } : undefined,
    },
  });

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDetailModalVisible(true);
  };

  const columns: ColumnsType<Notification> = [
    {
      title: "Status",
      key: "status",
      width: 100,
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
          <div className="font-medium">{record.user.username}</div>
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
      align: "center",
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
            {users.map((user: any) => (
              <Option key={user!.id} value={user!.id}>
                {user!.username} ({user!.email})
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
          dataSource={notifications}
          loading={isLoading || isRefetching}
          pagination={{
            current: where.pageIndex,
            onChange: (page, pageSize) => {
              setWhere((prev) => ({
                ...prev,
                pageIndex: page,
                pageSize: pageSize || prev.pageSize,
              }));
            },
            pageSizeOptions: ["5", "10", "20", "50"],
            defaultPageSize: 5,
            showSizeChanger: true,
            total: total,
            pageSize: where.pageSize,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
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
        width={"60%"}
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
                <div className="mt-1">
                  {selectedNotification?.user?.username} (
                  {selectedNotification?.user?.email})
                </div>
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
                <JSONView subscriptionData={selectedNotification.metadata} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotificationsList;
