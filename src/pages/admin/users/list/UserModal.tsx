import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import { Upload as UploadIcon } from "lucide-react";
const { TextArea } = Input;

const genderOptions = [
  { label: "Male", value: "Nam" },
  { label: "Female", value: "Nữ" },
  { label: "Other", value: "Khác" },
];

export default function UserModal({
  visible,
  editingUser,
  fileList,
  userForm,
  onCancel,
  onFinish,
  onUploadChange,
}: any) {
  return (
    <Modal
      destroyOnClose
      footer={null}
      open={visible}
      title={editingUser ? "Edit User" : "Create New User"}
      width={800}
      onCancel={onCancel}
    >
      <Form form={userForm} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter username!" },
                {
                  max: 500,
                  message: "Username must not exceed 500 characters!",
                },
              ]}
            >
              <Input placeholder="Enter username..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email!" },
                { type: "email", message: "Invalid email!" },
                {
                  max: 500,
                  message: "Email must not exceed 500 characters!",
                },
              ]}
            >
              <Input placeholder="Enter email..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Admin Privileges"
              name="isAdmin"
              valuePropName="checked"
            >
              <Switch checkedChildren="Admin" unCheckedChildren="User" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={true}
              label="Active Status"
              name="isActive"
              valuePropName="checked"
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Avatar">
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            listType="picture-card"
            maxCount={1}
            onChange={onUploadChange}
          >
            {fileList.length === 0 && (
              <div>
                <UploadIcon size={20} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Divider>Details</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Full Name" name="fullName">
              <Input placeholder="Enter full name..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input placeholder="Enter phone number..." />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Address" name="address">
          <Input placeholder="Enter address..." />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Birth Date" name="birthDate">
              <DatePicker
                placeholder="Select birth date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Gender" name="gender">
              <Select placeholder="Select gender">
                {genderOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Nationality" name="nationality">
              <Input placeholder="Enter nationality..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Travel Interests" name="travelInterests">
              <Input placeholder="e.g. Food, Culture, History..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Languages" name="languages">
              <Input placeholder="e.g. vi,en,fr..." />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Bio" name="bio">
          <TextArea placeholder="Enter bio..." rows={3} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary">
              {editingUser ? "Update" : "Create"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
