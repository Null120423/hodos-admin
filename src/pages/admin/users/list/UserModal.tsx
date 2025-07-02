import { Button, Col, Form, Input, Modal, Row, Space, Switch } from "antd";

export default function UserModal({
  visible,
  editingUser,
  userForm,
  onCancel,
  onFinish,
}: any) {
  return (
    <Modal
      destroyOnClose
      footer={null}
      open={visible}
      title={editingUser ? "Edit User" : "Create New User"}
      width={600}
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
                  max: 50,
                  message: "Username must not exceed 50 characters!",
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
              ]}
            >
              <Input placeholder="Enter email..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Admin Privileges"
              name="isAdmin"
              valuePropName="checked"
            >
              <Switch checkedChildren="Admin" unCheckedChildren="User" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              initialValue={true}
              label="Active Status"
              name="isActive"
              valuePropName="checked"
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Profile Complete"
              name="isUpdateDetail"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Complete"
                unCheckedChildren="Incomplete"
              />
            </Form.Item>
          </Col>
        </Row>

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
