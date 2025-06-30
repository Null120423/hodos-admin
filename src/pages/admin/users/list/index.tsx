import type { UploadFile, UploadProps } from "antd";

import { addToast } from "@heroui/react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import {
  CheckCircle2,
  Crown,
  FileUp,
  Filter,
  Plus,
  Search,
  User as UserIcon,
} from "lucide-react";
import { useState } from "react";

import UserDetailDrawer from "./UserDetailDrawer";
import UserModal from "./UserModal";
import UserTable from "./UserTable";
import { mockUsers } from "./_mock";

const { Content } = Layout;
const { Title } = Typography;

export default function UserManagementScreen() {
  const [users, setUsers] = useState(mockUsers);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isUserDetailVisible, setIsUserDetailVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userForm] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  // User Management Functions
  const handleCreateUser = () => {
    setEditingUser(null);
    setIsUserModalVisible(true);
    userForm.resetFields();
    setFileList([]);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsUserModalVisible(true);
    userForm.setFieldsValue({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin === "true",
      isActive: user.isActive,
      fullName: user.userDetail?.fullName,
      address: user.userDetail?.address,
      phoneNumber: user.userDetail?.phoneNumber,
      bio: user.userDetail?.bio,
      birthDate: user.userDetail?.birthDate
        ? dayjs(user.userDetail.birthDate)
        : null,
      gender: user.userDetail?.gender,
      nationality: user.userDetail?.nationality,
      travelInterests: user.userDetail?.travelInterests,
      languages: user.userDetail?.languages,
    });
    setFileList(
      user.avatar
        ? [
            {
              uid: "-1",
              name: "avatar.jpg",
              status: "done",
              url: user.avatar,
            },
          ]
        : []
    );
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    message.success("Xóa người dùng thành công!");
  };

  const handleViewUserDetail = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailVisible(true);
  };

  const handleToggleUserStatus = (user: any) => {
    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? {
            ...u,
            isActive: !u.isActive,
            updatedAt: new Date().toISOString(),
          }
        : u
    );

    setUsers(updatedUsers);
    message.success(
      `${user.isActive ? "Vô hiệu hóa" : "Kích hoạt"} người dùng thành công!`
    );
  };

  const handleSubmitUser = async (values: any) => {
    try {
      const avatarUrl = fileList[0]?.url || fileList[0]?.response?.url || "";

      if (editingUser) {
        // Update existing user
        const updatedUsers = users.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                username: values.username,
                email: values.email,
                avatar: avatarUrl,
                isAdmin: values.isAdmin ? "true" : "false",
                isActive: values.isActive,
                updatedAt: new Date().toISOString(),
                userDetail: {
                  ...user.userDetail,
                  fullName: values.fullName,
                  address: values.address,
                  phoneNumber: values.phoneNumber,
                  email: values.email,
                  bio: values.bio,
                  birthDate: values.birthDate
                    ? values.birthDate.format("YYYY-MM-DD")
                    : null,
                  gender: values.gender,
                  nationality: values.nationality,
                  travelInterests: values.travelInterests,
                  languages: values.languages,
                },
              }
            : user
        );

        setUsers(updatedUsers);
        message.success("Cập nhật người dùng thành công!");
      } else {
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          username: values.username,
          email: values.email,
          avatar: avatarUrl,
          verifyAt: new Date().toISOString(),
          isAdmin: values.isAdmin ? "true" : "false",
          isActive: values.isActive,
          isUpdateDetail: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userDetail: {
            fullName: values.fullName ?? "",
            address: values.address ?? "",
            phoneNumber: values.phoneNumber ?? "",
            email: values.email ?? "",
            bio: values.bio ?? "",
            profilePictureUrl:
              avatarUrl ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
            birthDate: values.birthDate
              ? values.birthDate.format("YYYY-MM-DD")
              : "",
            gender: values.gender ?? "",
            nationality: values.nationality ?? "",
            travelInterests: values.travelInterests ?? "",
            languages: values.languages ?? "",
            reputationScore: 0,
          },
          posts: [],
          totalPosts: 0,
          totalLikes: 0,
          totalComments: 0,
        };

        setUsers([newUser, ...users]);
        addToast({
          title: "Success",
          description: "Create User Successful",
          color: "success",
        });
      }

      setIsUserModalVisible(false);
      userForm.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.userDetail?.fullName
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    const matchesRole =
      !selectedRole ||
      (selectedRole === "admin"
        ? user.isAdmin === "true"
        : user.isAdmin === "false");
    const matchesStatus =
      !selectedStatus ||
      (selectedStatus === "active" ? user.isActive : !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.isActive).length;
  const adminUsers = users.filter((u) => u.isAdmin === "true").length;

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
          <Col span={8}>
            <Card>
              <Statistic
                prefix={<UserIcon size={16} />}
                title="Total Users"
                value={totalUsers}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                prefix={<CheckCircle2 color="#3f8600" size={16} />}
                title="Active Users"
                value={activeUsers}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                prefix={<Crown color="#cf1322" size={16} />}
                title="Admins"
                value={adminUsers}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>

        {/* User Filters */}
        <Card className="mb-6">
          <Row gutter={16}>
            <Col span={8}>
              <Input
                allowClear
                placeholder="Search users..."
                prefix={<Search size={16} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={6}>
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
            <Col span={6}>
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
            <Col span={4}>
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
            users={filteredUsers}
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
            onToggleStatus={handleToggleUserStatus}
            onView={handleViewUserDetail}
          />
        </Card>

        {/* User Create/Edit Modal */}
        <UserModal
          editingUser={editingUser}
          fileList={fileList}
          userForm={userForm}
          visible={isUserModalVisible}
          onCancel={() => setIsUserModalVisible(false)}
          onFinish={handleSubmitUser}
          onUploadChange={handleUploadChange}
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
