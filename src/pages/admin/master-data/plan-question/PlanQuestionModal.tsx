import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
const { TextArea } = Input;

export default function PlanQuestionModal({
  visible,
  editingQuestion,
  questionForm,
  questionTypeOptions,
  onCancel,
  onFinish,
  isLoading,
}: any) {
  return (
    <Modal
      destroyOnClose
      footer={null}
      open={visible}
      title={editingQuestion ? "Edit Question" : "Create New Question"}
      width={600}
      onCancel={onCancel}
    >
      <Form
        form={{
          ...questionForm,
          isActive: questionForm.isDeleted || false,
        }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Question Content"
          name="question"
          rules={[
            { required: true, message: "Please enter question content!" },
          ]}
        >
          <TextArea placeholder="Enter question content..." rows={3} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Question Type"
              name="type"
              rules={[
                { required: true, message: "Please select question type!" },
              ]}
            >
              <Select placeholder="Select question type">
                {questionTypeOptions.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Display Order"
              name="order"
              rules={[{ required: true, message: "Please enter order!" }]}
            >
              <Input placeholder="Enter order..." type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          initialValue={true}
          label="Active Status"
          name="isActive"
          valuePropName="checked"
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" loading={isLoading} type="primary">
              {editingQuestion ? "Update" : "Create"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
