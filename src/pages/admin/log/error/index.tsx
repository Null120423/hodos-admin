import type { ColumnsType } from "antd/es/table";

import {
  BugOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Drawer,
  Input,
  Row,
  Select,
  Statistic,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const sampleData = [
  {
    id: "70936f97-8d5d-4dc6-9ef5-2793ea706b9a",
    createdAt: "2025-07-02T09:58:18.355Z",
    project: "HODOS_ADMIN",
    source: "https://github.com/Tran-Huu-Tai-12-04-23/hodos-admin",
    environments: "LOCALHOST",
    timestamp: "2025-07-02T09:58:18.337Z",
    path: "/log/error-log",
    name: "BadRequestException",
    error:
      '{"response":{"message":["skip must be a number conforming to the specified constraints","take must be a number conforming to the specified constraints"],"error":"Bad Request","statusCode":400},"status":400,"options":{},"message":"Bad Request Exception","name":"BadRequestException"}',
    message:
      "skip must be a number conforming to the specified constraints + take must be a number conforming to the specified constraints",
    isFixed: false,
  },
  {
    id: "5e9cbf8a-73ae-4071-8714-4958a5a4e087",
    createdAt: "2025-07-02T09:58:00.939Z",
    project: "HODOS_ADMIN",
    source: "https://github.com/Tran-Huu-Tai-12-04-23/hodos-admin",
    environments: "LOCALHOST",
    timestamp: "2025-07-02T09:58:00.937Z",
    path: "/favicon.ico",
    name: "NotFoundException",
    error:
      '{"response":{"message":"Cannot GET /favicon.ico","error":"Not Found","statusCode":404},"status":404,"options":{},"message":"Cannot GET /favicon.ico","name":"NotFoundException"}',
    message: "Cannot GET /favicon.ico",
    isFixed: true,
  },
  {
    id: "30b3d1d7-5546-4dac-864b-d2dcdbad555c",
    createdAt: "2025-07-02T09:58:00.680Z",
    project: "HODOS_ADMIN",
    source: "https://github.com/Tran-Huu-Tai-12-04-23/hodos-admin",
    environments: "LOCALHOST",
    timestamp: "2025-07-02T09:58:00.653Z",
    path: "/",
    name: "NotFoundException",
    error:
      '{"response":{"message":"Cannot GET /","error":"Not Found","statusCode":404},"status":404,"options":{},"message":"Cannot GET /","name":"NotFoundException"}',
    message: "Cannot GET /",
    isFixed: false,
  },
];

interface LogEntry {
  id: string;
  createdAt: string;
  project: string;
  source: string;
  environments: string;
  timestamp: string;
  path: string;
  name: string;
  error: string;
  message: string;
  isFixed: boolean;
}

export default function ErrorLogManager() {
  const [data, setData] = useState<LogEntry[]>(sampleData);
  const [searchText, setSearchText] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("");
  const [selectedErrorType, setSelectedErrorType] = useState<string>("");
  const [showOnlyUnfixed, setShowOnlyUnfixed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );

  // Get unique values for filters
  const projects = [...new Set(data.map((item) => item.project))];
  const environments = [...new Set(data.map((item) => item.environments))];
  const errorTypes = [...new Set(data.map((item) => item.name))];

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        !searchText ||
        item.message.toLowerCase().includes(searchText.toLowerCase()) ||
        item.path.toLowerCase().includes(searchText.toLowerCase()) ||
        item.name.toLowerCase().includes(searchText.toLowerCase());

      const matchesProject =
        !selectedProject || item.project === selectedProject;
      const matchesEnvironment =
        !selectedEnvironment || item.environments === selectedEnvironment;
      const matchesErrorType =
        !selectedErrorType || item.name === selectedErrorType;
      const matchesFixedStatus = !showOnlyUnfixed || !item.isFixed;

      let matchesDateRange = true;

      if (dateRange) {
        const itemDate = dayjs(item.createdAt);

        matchesDateRange =
          itemDate.isAfter(dateRange[0]) && itemDate.isBefore(dateRange[1]);
      }

      return (
        matchesSearch &&
        matchesProject &&
        matchesEnvironment &&
        matchesErrorType &&
        matchesFixedStatus &&
        matchesDateRange
      );
    });
  }, [
    data,
    searchText,
    selectedProject,
    selectedEnvironment,
    selectedErrorType,
    showOnlyUnfixed,
    dateRange,
  ]);

  // Statistics
  const stats = useMemo(() => {
    const total = data.length;
    const fixed = data.filter((item) => item.isFixed).length;
    const unfixed = total - fixed;
    const criticalErrors = data.filter(
      (item) => item.name.includes("Error") || item.name.includes("Exception")
    ).length;

    return { total, fixed, unfixed, criticalErrors };
  }, [data]);

  const handleToggleFixed = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFixed: !item.isFixed } : item
      )
    );
  };

  const handleViewDetails = (record: LogEntry) => {
    setSelectedLog(record);
    setDrawerVisible(true);
  };

  const getErrorSeverity = (errorName: string) => {
    if (errorName.includes("Error") || errorName.includes("TypeError"))
      return "error";
    if (errorName.includes("Exception")) return "warning";

    return "default";
  };

  const columns: ColumnsType<LogEntry> = [
    {
      title: "Status",
      dataIndex: "isFixed",
      key: "isFixed",
      width: 80,
      render: (isFixed: boolean, record) => (
        <Tooltip title={isFixed ? "Mark as unfixed" : "Mark as fixed"}>
          <Switch
            checked={isFixed}
            checkedChildren={<CheckCircleOutlined />}
            className={isFixed ? "bg-green-500" : "bg-red-500"}
            unCheckedChildren={<ExclamationCircleOutlined />}
            onChange={() => handleToggleFixed(record.id)}
          />
        </Tooltip>
      ),
    },
    {
      title: "Error Type",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name: string) => (
        <Tag color={getErrorSeverity(name)} icon={<BugOutlined />}>
          {name}
        </Tag>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
      render: (message: string) => (
        <Text className="text-gray-700" title={message}>
          {message.length > 100 ? `${message.substring(0, 100)}...` : message}
        </Text>
      ),
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
      width: 150,
      render: (path: string) => (
        <Tag className="font-mono text-xs" color="blue">
          {path}
        </Tag>
      ),
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      width: 120,
      render: (project: string) => <Tag color="purple">{project}</Tag>,
    },
    {
      title: "Environment",
      dataIndex: "environments",
      key: "environments",
      width: 120,
      render: (env: string) => (
        <Tag
          color={
            env === "PRODUCTION"
              ? "red"
              : env === "STAGING"
                ? "orange"
                : "green"
          }
        >
          {env}
        </Tag>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date: string) => (
        <Text className="text-gray-600 text-sm">
          {dayjs(date).format("MMM DD, YYYY HH:mm:ss")}
        </Text>
      ),
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      defaultSortOrder: "descend",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Button
          className="text-blue-600 hover:text-blue-800"
          icon={<EyeOutlined />}
          type="link"
          onClick={() => handleViewDetails(record)}
        />
      ),
    },
  ];

  const clearFilters = () => {
    setSearchText("");
    setSelectedProject("");
    setSelectedEnvironment("");
    setSelectedErrorType("");
    setShowOnlyUnfixed(false);
    setDateRange(null);
  };

  return (
    <div className=" mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Title className="mb-2 text-gray-800" level={2}>
          <BugOutlined className="mr-2" />
          Build Log Manager
        </Title>
        <Text className="text-gray-600">
          Monitor and manage application errors and exceptions
        </Text>
      </div>

      {/* Statistics Cards */}
      <Row className="mb-6" gutter={16}>
        <Col md={6} sm={12} xs={24}>
          <Card>
            <Statistic
              prefix={<BugOutlined />}
              title="Total Logs"
              value={stats.total}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col md={6} sm={12} xs={24}>
          <Card>
            <Statistic
              prefix={<CheckCircleOutlined />}
              title="Fixed"
              value={stats.fixed}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col md={6} sm={12} xs={24}>
          <Card>
            <Statistic
              prefix={<ExclamationCircleOutlined />}
              title="Unfixed"
              value={stats.unfixed}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
        <Col md={6} sm={12} xs={24}>
          <Card>
            <Statistic
              prefix={<BugOutlined />}
              title="Critical"
              value={stats.criticalErrors}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Input
            className="w-64"
            placeholder="Search logs..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Select
            allowClear
            className="w-40"
            placeholder="Project"
            value={selectedProject}
            onChange={setSelectedProject}
          >
            {projects.map((project) => (
              <Option key={project} value={project}>
                {project}
              </Option>
            ))}
          </Select>

          <Select
            allowClear
            className="w-40"
            placeholder="Environment"
            value={selectedEnvironment}
            onChange={setSelectedEnvironment}
          >
            {environments.map((env) => (
              <Option key={env} value={env}>
                {env}
              </Option>
            ))}
          </Select>

          <Select
            allowClear
            className="w-40"
            placeholder="Error Type"
            value={selectedErrorType}
            onChange={setSelectedErrorType}
          >
            {errorTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>

          <RangePicker
            className="w-64"
            value={dateRange}
            onChange={(val) => {
              if (val && val[0] && val[1]) {
                setDateRange([val[0], val[1]]);
              } else {
                setDateRange(null);
              }
            }}
          />

          <div className="flex items-center gap-2">
            <Text>Show only unfixed:</Text>
            <Switch checked={showOnlyUnfixed} onChange={setShowOnlyUnfixed} />
          </div>

          <Button
            className="ml-auto"
            icon={<FilterOutlined />}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          rowClassName={(record) =>
            record.isFixed ? "bg-green-50" : "bg-red-50"
          }
          rowKey="id"
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Details Drawer */}
      <Drawer
        open={drawerVisible}
        placement="right"
        title="Error Details"
        width={600}
        onClose={() => setDrawerVisible(false)}
      >
        {selectedLog && (
          <div className="space-y-4">
            <Alert
              showIcon
              description={selectedLog.message}
              message={selectedLog.name}
              type={selectedLog.isFixed ? "success" : "error"}
            />

            <Descriptions bordered column={1} title="Log Information">
              <Descriptions.Item label="ID">
                <Text code>{selectedLog.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Project">
                <Tag color="purple">{selectedLog.project}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Environment">
                <Tag
                  color={
                    selectedLog.environments === "PRODUCTION" ? "red" : "green"
                  }
                >
                  {selectedLog.environments}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Path">
                <Text code>{selectedLog.path}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Source">
                <a
                  href={selectedLog.source}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {selectedLog.source}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {dayjs(selectedLog.createdAt).format("MMMM DD, YYYY HH:mm:ss")}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge
                  status={selectedLog.isFixed ? "success" : "error"}
                  text={selectedLog.isFixed ? "Fixed" : "Unfixed"}
                />
              </Descriptions.Item>
            </Descriptions>

            <div>
              <Title level={5}>Error Details</Title>
              <div className="bg-gray-100 p-4 rounded-md">
                <pre className="text-sm overflow-auto whitespace-pre-wrap">
                  {JSON.stringify(JSON.parse(selectedLog.error), null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                icon={
                  selectedLog.isFixed ? (
                    <ExclamationCircleOutlined />
                  ) : (
                    <CheckCircleOutlined />
                  )
                }
                type="primary"
                onClick={() => {
                  handleToggleFixed(selectedLog.id);
                  setSelectedLog({
                    ...selectedLog,
                    isFixed: !selectedLog.isFixed,
                  });
                }}
              >
                Mark as {selectedLog.isFixed ? "Unfixed" : "Fixed"}
              </Button>
              <Button onClick={() => setDrawerVisible(false)}>Close</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
