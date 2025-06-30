import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
const { TextArea } = Input;

export default function PlanOptionModal({
  visible,
  editingOption,
  optionForm,
  onCancel,
  onFinish,
  isLoading,
}: any) {
  return (
    <Modal
      destroyOnClose
      footer={null}
      open={visible}
      title={editingOption ? "Edit Option" : "Create New Option"}
      width={600}
      onCancel={onCancel}
    >
      <Form form={optionForm} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Display Label"
              name="label"
              rules={[
                { required: true, message: "Please enter display label!" },
              ]}
            >
              <Input placeholder="Enter display label..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Value"
              name="value"
              rules={[{ required: true, message: "Please enter value!" }]}
            >
              <Input placeholder="Enter value..." />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Description" name="desc">
          <TextArea placeholder="Enter option description..." rows={2} />
        </Form.Item>

        <Form.Item label="Emoji Icon" name="icon">
          <Input placeholder="Enter emoji icon..." />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" loading={isLoading} type="primary">
              {editingOption ? "Update" : "Create"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
