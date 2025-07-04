import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

import {
  NotificationChannel,
  NotificationType,
  ScheduledNotification,
} from "../type";

import useUserSelectBox from "@/services/hooks/admin/user/useSelectBox";

const { TextArea } = Input;
const { Option } = Select;

interface ScheduledNotificationFormProps {
  initialValues?: ScheduledNotification | null;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

// Mock users - replace with actual API call

export function ScheduledNotificationForm({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}: ScheduledNotificationFormProps) {
  const [form] = Form.useForm();
  const { data: users } = useUserSelectBox();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        scheduledTime: dayjs(initialValues.scheduledTime),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      scheduledTime: values.scheduledTime.toISOString(),
    };

    onSubmit(formattedValues);
  };

  return (
    <Form
      className="mt-4"
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            help="Leave empty to send to all users"
            label="Target User"
            name="targetUserIds"
          >
            <Select
              allowClear
              showSearch
              mode="multiple"
              optionFilterProp="children"
              placeholder="Select a user (optional)"
            >
              {users.map((user: any) => (
                <Option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Notification Type"
            name="notificationType"
            rules={[
              { required: true, message: "Please select notification type" },
            ]}
          >
            <Select placeholder="Select notification type">
              {Object.values(NotificationType).map((type: any) => (
                <Option key={type} value={type}>
                  {type.toUpperCase()}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please enter notification title" },
              { max: 255, message: "Title must be less than 255 characters" },
            ]}
          >
            <Input placeholder="Enter notification title" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Is All User"
            name="isAllUser"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Message"
        name="message"
        rules={[
          { required: true, message: "Please enter notification message" },
        ]}
      >
        <TextArea
          showCount
          maxLength={1000}
          placeholder="Enter notification message"
          rows={4}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Notification Channels"
            name="channels"
            rules={[
              { required: true, message: "Please select at least one channel" },
            ]}
          >
            <Select mode="multiple" placeholder="Select notification channels">
              {Object.values(NotificationChannel).map((channel: any) => (
                <Option key={channel} value={channel}>
                  {channel.toUpperCase()}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Scheduled Time"
            name="scheduledTime"
            rules={[
              { required: true, message: "Please select scheduled time" },
            ]}
          >
            <DatePicker
              showTime
              className="w-full"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
              format="YYYY-MM-DD HH:mm"
              placeholder="Select scheduled time"
            />
          </Form.Item>
        </Col>
      </Row>

      <Card className="mb-4" size="small" title="Additional Data (Optional)">
        <Form.Item
          help="Additional data to be used when generating the notification"
          label="Payload (JSON)"
          name="payload"
        >
          <TextArea
            placeholder='{"key": "value", "templateVar": "data"}'
            rows={3}
          />
        </Form.Item>
      </Card>

      <Form.Item className="mb-0">
        <Space className="w-full justify-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button htmlType="submit" loading={loading} type="primary">
            {initialValues ? "Update" : "Create"} Notification
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
