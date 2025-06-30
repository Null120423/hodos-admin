import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
const { TextArea } = Input;

export default function PricingPlanModal({
  visible,
  editingPlan,
  planForm,
  billingCycleOptions,
  currencyOptions,
  onCancel,
  onFinish,
  isLoading,
}: any) {
  return (
    <Modal
      destroyOnClose
      footer={null}
      open={visible}
      title={editingPlan ? "Edit Plan" : "Create New Plan"}
      width={800}
      onCancel={onCancel}
    >
      <Form form={planForm} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Plan Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter plan name!",
                },
              ]}
            >
              <Input placeholder="Enter plan name..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Plan Code"
              name="planCode"
              rules={[
                {
                  required: true,
                  message: "Please enter plan code!",
                },
              ]}
            >
              <Input placeholder="Enter plan code..." />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Description" name="description">
          <TextArea placeholder="Enter plan description..." rows={3} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter price!" }]}
            >
              <InputNumber
                min={0}
                placeholder="0.00"
                precision={2}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Currency"
              name="currency"
              rules={[{ required: true, message: "Please select currency!" }]}
            >
              <Select placeholder="Select currency">
                {currencyOptions.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Billing Cycle"
              name="billingCycle"
              rules={[
                {
                  required: true,
                  message: "Please select billing cycle!",
                },
              ]}
            >
              <Select placeholder="Select billing cycle">
                {billingCycleOptions.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Trial Period (days)" name="trialPeriodDays">
              <InputNumber min={0} placeholder="0" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Display Order" name="displayOrder">
              <InputNumber min={1} placeholder="1" style={{ width: "100%" }} />
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
        </Row>

        <Form.Item label="Features (one per line)" name="features">
          <TextArea placeholder="Enter features, one per line..." rows={4} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Max Trips Per Month" name="maxTripsPerMonth">
              <InputNumber
                min={-1}
                placeholder="-1 (unlimited)"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Max Collaborators Per Trip"
              name="maxCollaboratorsPerTrip"
            >
              <InputNumber
                min={-1}
                placeholder="-1 (unlimited)"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space>
            <Button htmlType="submit" loading={isLoading} type="primary">
              {editingPlan ? "Update" : "Create"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
