import {
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Column, Line, Pie } from "@ant-design/plots";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Layout,
  List,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

// Mock analytics data
const mockAnalytics = {
  totalUsers: 45672,
  premiumUpgrades: 1234,
  tripsCreated: 8956,
  revenue: 125430,
  monthlyGrowth: 12.5,
  userGrowth: 8.3,
  premiumGrowth: 15.2,
  tripGrowth: 22.1,
};

// Sample data from the attachment (simplified for dashboard)
const foodData = [
  {
    id: "1",
    name: "Bánh Bèo",
    address: "45C Ky Dong Street, Ward 9, District 3",
    type: "FOOD",
    views: 2340,
    rating: 4.5,
    status: "active",
  },
  {
    id: "2",
    name: "Bánh Căn",
    address: "222/6A Bui Dinh Tuy, Ward 12, Binh Thanh District",
    type: "FOOD",
    views: 1890,
    rating: 4.3,
    status: "active",
  },
  {
    id: "3",
    name: "Bánh Mì",
    address: "19 Huynh Khuong Ninh Street, Da Kao Ward, District 1",
    type: "FOOD",
    views: 3420,
    rating: 4.7,
    status: "active",
  },
];

const locationData = [
  {
    id: "1",
    name: "Ben Thanh Market",
    address: "Lê Lợi Street, Bến Thành Ward, District 1",
    type: "LOCATION",
    views: 5670,
    rating: 4.4,
    status: "active",
  },
  {
    id: "2",
    name: "Bitexco Financial Tower",
    address: "02 Hai Trieu Street, Ben Nghe Ward, District 1",
    type: "LOCATION",
    views: 4230,
    rating: 4.6,
    status: "active",
  },
  {
    id: "3",
    name: "Bui Vien Street",
    address: "Bui Vien Street, Pham Ngu Lao Ward, District 1",
    type: "LOCATION",
    views: 6890,
    rating: 4.2,
    status: "active",
  },
];

// Chart data
const monthlyRevenueData = [
  { month: "Jan", revenue: 85000, users: 3200 },
  { month: "Feb", revenue: 92000, users: 3800 },
  { month: "Mar", revenue: 78000, users: 3100 },
  { month: "Apr", revenue: 105000, users: 4200 },
  { month: "May", revenue: 118000, users: 4800 },
  { month: "Jun", revenue: 125430, users: 5200 },
];

const categoryData = [
  { type: "Food", value: 45, count: 12 },
  { type: "Locations", value: 35, count: 25 },
  { type: "Hotels", value: 20, count: 8 },
];

const userActivityData = [
  { hour: "00", users: 120 },
  { hour: "04", users: 80 },
  { hour: "08", users: 350 },
  { hour: "12", users: 480 },
  { hour: "16", users: 420 },
  { hour: "20", users: 380 },
];

export default function DashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  const foodColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      render: (views: number) => (
        <Space>
          <EyeOutlined />
          {views.toLocaleString()}
        </Space>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <Tag color={rating >= 4.5 ? "green" : rating >= 4.0 ? "orange" : "red"}>
          ⭐ {rating}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} type="link" />
          <Button icon={<EditOutlined />} type="link" />
          <Button danger icon={<DeleteOutlined />} type="link" />
        </Space>
      ),
    },
  ];

  const revenueConfig = {
    data: monthlyRevenueData,
    xField: "month",
    yField: "revenue",
    smooth: true,
    color: "#1890ff",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  const categoryConfig = {
    data: categoryData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
  };

  const userActivityConfig = {
    data: userActivityData,
    xField: "hour",
    yField: "users",
    color: "#52c41a",
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-sm border-b px-6">
        <div className="flex justify-between items-center">
          <Title className="m-0" level={3}>
            Ho Chi Minh City Tourism Dashboard
          </Title>
          <Space>
            <Select
              style={{ width: 120 }}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
            >
              <Select.Option value="7d">Last 7 days</Select.Option>
              <Select.Option value="30d">Last 30 days</Select.Option>
              <Select.Option value="90d">Last 90 days</Select.Option>
            </Select>
            <RangePicker />
            <Button icon={<PlusOutlined />} type="primary">
              Add Content
            </Button>
          </Space>
        </div>
      </Header>

      <Content className="p-6 bg-gray-50">
        {/* Key Metrics */}
        <Row className="mb-6" gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                prefix={<UserOutlined />}
                suffix={
                  <span className="text-green-500 text-sm">
                    <ArrowUpOutlined /> {mockAnalytics.userGrowth}%
                  </span>
                }
                title="Total Users"
                value={mockAnalytics.totalUsers}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                prefix={<TrophyOutlined />}
                suffix={
                  <span className="text-green-500 text-sm">
                    <ArrowUpOutlined /> {mockAnalytics.premiumGrowth}%
                  </span>
                }
                title="Premium Upgrades"
                value={mockAnalytics.premiumUpgrades}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                prefix={<EnvironmentOutlined />}
                suffix={
                  <span className="text-green-500 text-sm">
                    <ArrowUpOutlined /> {mockAnalytics.tripGrowth}%
                  </span>
                }
                title="Trips Created"
                value={mockAnalytics.tripsCreated}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                prefix="$"
                suffix={
                  <span className="text-green-500 text-sm">
                    <ArrowUpOutlined /> {mockAnalytics.monthlyGrowth}%
                  </span>
                }
                title="Revenue"
                value={mockAnalytics.revenue}
              />
            </Card>
          </Col>
        </Row>

        {/* Charts Section */}
        <Row className="mb-6" gutter={16}>
          <Col span={16}>
            <Card extra={<Button>Export</Button>} title="Monthly Revenue Trend">
              <Line {...revenueConfig} height={300} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Content Distribution">
              <Pie {...categoryConfig} height={300} />
            </Card>
          </Col>
        </Row>

        <Row className="mb-6" gutter={16}>
          <Col span={12}>
            <Card title="User Activity (24h)">
              <Column {...userActivityConfig} height={250} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Quick Stats">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Text>Food Items</Text>
                  <div className="flex items-center space-x-2">
                    <Progress className="w-20" percent={75} size="small" />
                    <Text strong>12</Text>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Text>Locations</Text>
                  <div className="flex items-center space-x-2">
                    <Progress className="w-20" percent={85} size="small" />
                    <Text strong>25</Text>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Text>Active Users</Text>
                  <div className="flex items-center space-x-2">
                    <Progress className="w-20" percent={92} size="small" />
                    <Text strong>8,234</Text>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Text>Premium Users</Text>
                  <div className="flex items-center space-x-2">
                    <Progress className="w-20" percent={28} size="small" />
                    <Text strong>1,234</Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Content Management */}
        <Tabs defaultActiveKey="1">
          <TabPane
            key="1"
            tab={
              <span>
                <ShoppingCartOutlined />
                Food Items
              </span>
            }
          >
            <Card
              extra={
                <Space>
                  <Badge showZero count={foodData.length}>
                    <Button>Total Items</Button>
                  </Badge>
                  <Button icon={<PlusOutlined />} type="primary">
                    Add Food Item
                  </Button>
                </Space>
              }
              title="Food Management"
            >
              <Table
                columns={foodColumns}
                dataSource={foodData}
                pagination={{ pageSize: 10 }}
                rowKey="id"
              />
            </Card>
          </TabPane>

          <TabPane
            key="2"
            tab={
              <span>
                <EnvironmentOutlined />
                Locations
              </span>
            }
          >
            <Card
              extra={
                <Space>
                  <Badge showZero count={locationData.length}>
                    <Button>Total Locations</Button>
                  </Badge>
                  <Button icon={<PlusOutlined />} type="primary">
                    Add Location
                  </Button>
                </Space>
              }
              title="Location Management"
            >
              <Table
                columns={foodColumns}
                dataSource={locationData}
                pagination={{ pageSize: 10 }}
                rowKey="id"
              />
            </Card>
          </TabPane>

          <TabPane
            key="3"
            tab={
              <span>
                <UserOutlined />
                Recent Activity
              </span>
            }
          >
            <Card title="Recent User Activities">
              <List
                dataSource={[
                  {
                    title: "New user registered",
                    description: "john.doe@email.com joined the platform",
                    time: "2 minutes ago",
                    type: "user",
                  },
                  {
                    title: "Premium upgrade",
                    description: "User upgraded to premium plan",
                    time: "5 minutes ago",
                    type: "premium",
                  },
                  {
                    title: "Trip created",
                    description: "3-day Ho Chi Minh City tour planned",
                    time: "10 minutes ago",
                    type: "trip",
                  },
                  {
                    title: "Food item viewed",
                    description: "Bánh Mì page visited 50 times today",
                    time: "15 minutes ago",
                    type: "view",
                  },
                ]}
                itemLayout="horizontal"
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={
                            item.type === "user" ? (
                              <UserOutlined />
                            ) : item.type === "premium" ? (
                              <TrophyOutlined />
                            ) : item.type === "trip" ? (
                              <EnvironmentOutlined />
                            ) : (
                              <EyeOutlined />
                            )
                          }
                          style={{
                            backgroundColor:
                              item.type === "user"
                                ? "#1890ff"
                                : item.type === "premium"
                                  ? "#faad14"
                                  : item.type === "trip"
                                    ? "#52c41a"
                                    : "#722ed1",
                          }}
                        />
                      }
                      description={item.description}
                      title={item.title}
                    />
                    <Text type="secondary">{item.time}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          <TabPane key="4" tab="Analytics">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Top Performing Content">
                  <List
                    dataSource={[
                      { name: "Bánh Mì", views: 3420, type: "Food" },
                      {
                        name: "Bui Vien Street",
                        views: 6890,
                        type: "Location",
                      },
                      {
                        name: "Ben Thanh Market",
                        views: 5670,
                        type: "Location",
                      },
                      { name: "Bánh Bèo", views: 2340, type: "Food" },
                    ]}
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{
                                backgroundColor:
                                  index === 0 ? "#faad14" : "#1890ff",
                              }}
                            >
                              {index + 1}
                            </Avatar>
                          }
                          description={`${item.views.toLocaleString()} views • ${item.type}`}
                          title={item.name}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Conversion Metrics">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <Text>Visitor to User</Text>
                        <Text strong>12.5%</Text>
                      </div>
                      <Progress percent={12.5} strokeColor="#52c41a" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <Text>User to Premium</Text>
                        <Text strong>8.3%</Text>
                      </div>
                      <Progress percent={8.3} strokeColor="#faad14" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <Text>Trip Completion</Text>
                        <Text strong>85.2%</Text>
                      </div>
                      <Progress percent={85.2} strokeColor="#1890ff" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <Text>User Retention (30d)</Text>
                        <Text strong>68.7%</Text>
                      </div>
                      <Progress percent={68.7} strokeColor="#722ed1" />
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
