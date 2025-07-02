"use client";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import {
  CheckCircle2,
  CreditCard,
  Crown,
  FileUp,
  Filter,
  Plus,
  Search,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import UserDetailDrawer from "./UserDetailDrawer";
import UserModal from "./UserModal";
import UserTable from "./UserTable";

import useUserPagination from "@/services/hooks/admin/user/userPaginnation";

const { Content } = Layout;
const { Title } = Typography;

export default function UserManagementScreen() {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isUserDetailVisible, setIsUserDetailVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userForm] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const {
    data: users,
    refetch,
    totalActiveUser,
    totalAdminUser,
    totalUser,
    totalPremium,
    isLoading,
    isRefetching,
  } = useUserPagination({
    skip: 0,
    take: 10,
    where: {
      searchText,
      isAdmin: selectedRole === "admin",
      status: selectedStatus,
    },
  });

  // User Management Functions
  const handleCreateUser = () => {
    setEditingUser(null);
    setIsUserModalVisible(true);
    userForm.resetFields();
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsUserModalVisible(true);
    userForm.setFieldsValue({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin === true,
      isActive: user.isActive,
      isUpdateDetail: user.isUpdateDetail,
    });
  };

  const handleDeleteUser = (id: string) => {};

  const handleViewUserDetail = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailVisible(true);
  };

  const handleToggleUserStatus = (user: any) => {
    console.log("Toggling status for user:", user);
  };

  const handleSubmitUser = async (values: any) => {
    console.log("Submitted values:", values);
    // try {
    //   if (editingUser) {
    //     // Update existing user
    //     const updatedUsers = users.map((user) =>
    //       user.id === editingUser.id
    //         ? {
    //             ...user,
    //             username: values.username,
    //             email: values.email,
    //             isAdmin: values.isAdmin,
    //             isActive: values.isActive,
    //             isUpdateDetail: values.isUpdateDetail,
    //             updatedAt: new Date().toISOString(),
    //           }
    //         : user
    //     );
    //     setUsers(updatedUsers);
    //     message.success("User updated successfully!");
    //   } else {
    //     // Create new user
    //     const newUser = {
    //       id: Date.now().toString(),
    //       username: values.username,
    //       email: values.email,
    //       avatar:
    //         "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    //       verifyAt: new Date().toISOString(),
    //       isAdmin: values.isAdmin,
    //       isActive: values.isActive,
    //       isUpdateDetail: values.isUpdateDetail || false,
    //       createdAt: new Date().toISOString(),
    //       updatedAt: new Date().toISOString(),
    //       userSubscriptionInfo: {
    //         isPremium: false,
    //         isAutoRenew: false,
    //         subscriptionStatus: "inactive",
    //       },
    //       userSubscription: null,
    //     };
    //     setUsers([newUser, ...users]);
    //     message.success("User created successfully!");
    //   }
    //   setIsUserModalVisible(false);
    //   userForm.resetFields();
    // } catch (error) {
    //   message.error("An error occurred!");
    // }
  };

  useEffect(() => {
    refetch();
  }, [searchText, selectedRole, selectedStatus, ,]);

  return (
    <Layout>
      <div className="flex justify-between items-center mt-2">
        <Title className="m-0" level={3}>
          User Management
        </Title>
        <Space>
          <Button icon={<FileUp size={16} />}>Export Data</Button>
          <Button
            icon={<Plus size={16} />}
            type="primary"
            onClick={handleCreateUser}
          >
            Create New User
          </Button>
        </Space>
      </div>

      <Content>
        {/* Statistics */}
        <Row className="mb-6" gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                prefix={<UserIcon size={16} />}
                title="Total Users"
                value={totalUser}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                prefix={<CheckCircle2 color="#3f8600" size={16} />}
                title="Active Users"
                value={totalActiveUser}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                prefix={<Crown color="#cf1322" size={16} />}
                title="Admins"
                value={totalAdminUser}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                prefix={<CreditCard color="#1890ff" size={16} />}
                title="Premium Users"
                value={totalPremium}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
        </Row>

        {/* User Filters */}
        <Card className="mb-6">
          <Row gutter={16}>
            <Col span={6}>
              <Input
                allowClear
                placeholder="Search users..."
                prefix={<Search size={16} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Select
                allowClear
                placeholder="Filter by role"
                style={{ width: "100%" }}
                value={selectedRole}
                onChange={setSelectedRole}
              >
                <Select.Option value="admin">
                  <Tag color="red">Admin</Tag>
                </Select.Option>
                <Select.Option value="user">
                  <Tag color="blue">User</Tag>
                </Select.Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select
                allowClear
                placeholder="Filter by status"
                style={{ width: "100%" }}
                value={selectedStatus}
                onChange={setSelectedStatus}
              >
                <Select.Option value="active">
                  <Tag color="green">Active</Tag>
                </Select.Option>
                <Select.Option value="inactive">
                  <Tag color="red">Inactive</Tag>
                </Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <Button
                icon={<Filter size={16} />}
                onClick={() => {
                  setSearchText("");
                  setSelectedRole(undefined);
                  setSelectedStatus(undefined);
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Users Table */}
        <Card>
          <UserTable
            isLoading={isLoading || isRefetching}
            users={users}
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
            onToggleStatus={handleToggleUserStatus}
            onView={handleViewUserDetail}
          />
        </Card>

        {/* User Create/Edit Modal */}
        <UserModal
          editingUser={editingUser}
          userForm={userForm}
          visible={isUserModalVisible}
          onCancel={() => setIsUserModalVisible(false)}
          onFinish={handleSubmitUser}
        />

        {/* User Detail Drawer */}
        <UserDetailDrawer
          user={selectedUser}
          visible={isUserDetailVisible}
          onClose={() => setIsUserDetailVisible(false)}
        />
      </Content>
    </Layout>
  );
}
