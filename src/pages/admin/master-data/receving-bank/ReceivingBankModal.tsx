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

export default function ReceivingBankModal({
  visible,
  editingBank,
  bankForm,
  bankOptions,
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
      title={editingBank ? "Edit Bank" : "Add New Bank"}
      width={700}
      onCancel={onCancel}
    >
      <Form form={bankForm} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Bank Name"
              name="bankName"
              rules={[{ required: true, message: "Please select bank name!" }]}
            >
              <Select
                placeholder="Select bank"
                onChange={(value) => {
                  const selectedBank = bankOptions.find(
                    (b: any) => b.value === value,
                  );

                  if (selectedBank) {
                    bankForm.setFieldsValue({
                      bankCode: selectedBank.code,
                    });
                  }
                }}
              >
                {bankOptions.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label} ({option.code})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Bank Code"
              name="bankCode"
              rules={[{ required: true, message: "Please enter bank code!" }]}
            >
              <Input placeholder="Enter bank code..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Account Number"
              name="accountNumber"
              rules={[
                { required: true, message: "Please enter account number!" },
              ]}
            >
              <Input placeholder="Enter account number..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Account Holder"
              name="accountHolderName"
              rules={[
                {
                  required: true,
                  message: "Please enter account holder name!",
                },
              ]}
            >
              <Input placeholder="Enter account holder name..." />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Branch" name="branchName">
          <Input placeholder="Enter branch name..." />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
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

        <Form.Item>
          <Space>
            <Button htmlType="submit" loading={isLoading} type="primary">
              {editingBank ? "Update" : "Create"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
