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

import useLogErrorPagination from "@/services/hooks/admin/logs/error/useLogErrorPagination";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function ErrorLogManager() {
  const [searchText, setSearchText] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("");
  const [selectedErrorType, setSelectedErrorType] = useState<string>("");
  const [showOnlyUnfixed, setShowOnlyUnfixed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );
  const [where, setWhere] = useState({
    pageIndex: 1,
    pageSize: 5,
  });
  const { data, isLoading, isRefetching, total } = useLogErrorPagination({
    skip: (where.pageIndex - 1) * where.pageSize,
    take: where.pageSize,
    where: {
      project: selectedProject,
      environments: selectedEnvironment,
      name: selectedErrorType,
      isFixed: showOnlyUnfixed ? false : undefined,
      createdAt: dateRange
        ? {
            gte: dateRange[0].startOf("day").toISOString(),
            lte: dateRange[1].endOf("day").toISOString(),
          }
        : undefined,
      message: searchText ? { contains: searchText } : undefined,
    },
  });

  // Get unique values for filters
  const projects = [...new Set(data?.map((item: any) => item.project))];
  const environments = [
    ...new Set(data?.map((item: any) => item.environments)),
  ];
  const errorTypes = [...new Set(data?.map((item: any) => item.name))];

  // Statistics
  const stats = useMemo(() => {
    const total = data?.length;
    const fixed = data?.filter((item: any) => item.isFixed).length;
    const unfixed = total - fixed;
    const criticalErrors = data?.filter(
      (item: any) =>
        item.name.includes("Error") || item.name.includes("Exception")
    ).length;

    return { total, fixed, unfixed, criticalErrors };
  }, [data]);

  const handleToggleFixed = (id: string) => {
    console.log(`Toggling fixed status for log ID: ${id}`);
  };

  const handleViewDetails = (record: any) => {
    setSelectedLog(record);
    setDrawerVisible(true);
  };

  const getErrorSeverity = (errorName: string) => {
    if (errorName.includes("Error") || errorName.includes("TypeError"))
      return "error";
    if (errorName.includes("Exception")) return "warning";

    return "default";
  };

  const columns: ColumnsType = [
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
      width: 120,
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
      width: 220,
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
      align: "center",
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
            {projects.map((project: any) => (
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
            {environments.map((env: any) => (
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
            {errorTypes.map((type: any) => (
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
          dataSource={data}
          loading={isLoading || isRefetching}
          pagination={{
            current: where.pageIndex,
            onChange: (page, pageSize) => {
              setWhere((prev) => ({
                ...prev,
                pageIndex: page,
                pageSize: pageSize || 5,
              }));
            },
            pageSizeOptions: ["5", "10", "20", "50"],
            showSizeChanger: true,
            pageSize: where.pageSize,
            total: total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          rowKey="id"
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Details Drawer */}
      <Drawer
        open={drawerVisible}
        placement="right"
        title="Error Details"
        width={"60%"}
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
            <div>
              <Title level={5}>Request Details</Title>
              <div className="bg-gray-100 p-4 rounded-md">
                <pre className="text-sm overflow-auto whitespace-pre-wrap">
                  {JSON.stringify(JSON.parse(selectedLog.request), null, 2)}
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
