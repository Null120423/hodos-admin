import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Col,
  Divider,
  Drawer,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";

const { Title, Text } = Typography;

export default function PricingPlanDetailDrawer({
  visible,
  plan,
  billingCycleOptions,
  onClose,
}: any) {
  const billingCycle = billingCycleOptions.find(
    (c: any) => c.value === plan?.billingCycle,
  );

  return (
    <Drawer
      bodyStyle={{ background: "#fafbfc", padding: 24 }}
      open={visible}
      placement="right"
      title={
        <span style={{ fontWeight: 700, fontSize: 22 }}>Plan Details</span>
      }
      width={600}
      onClose={onClose}
    >
      {plan && (
        <div>
          <div className="mb-6">
            <Space direction="vertical" size={2} style={{ width: "100%" }}>
              <Title level={3} style={{ marginBottom: 0 }}>
                {plan.name}
              </Title>
              <Space size="small">
                <Text
                  className="text-lg font-semibold"
                  style={{ fontSize: 22 }}
                >
                  {plan.price} {plan.currency}
                </Text>
                <Text style={{ fontSize: 16 }} type="secondary">
                  /{billingCycle?.label?.toLowerCase()}
                </Text>
              </Space>
              <Space className="mt-2" size="small">
                <Tag
                  color={billingCycle?.color || "blue"}
                  style={{ fontWeight: 600 }}
                >
                  {billingCycle?.label}
                </Tag>
                <Tag
                  color={plan.isActive ? "green" : "red"}
                  icon={
                    plan.isActive ? (
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    ) : (
                      <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                    )
                  }
                  style={{ fontWeight: 600 }}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </Tag>
              </Space>
            </Space>
          </div>

          <Divider orientation="left" orientationMargin={0}>
            <InfoCircleOutlined /> Basic Info
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <div className="mb-4">
                <Text strong>Plan Code:</Text>
                <div>
                  <Tag color="geekblue">{plan.planCode}</Tag>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-4">
                <Text strong>Description:</Text>
                <div>
                  <Text type={plan.description ? undefined : "secondary"}>
                    {plan.description || "No description"}
                  </Text>
                </div>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Trial Period:</Text>
                <div>
                  <Tag color={plan.trialPeriodDays > 0 ? "gold" : "default"}>
                    {plan.trialPeriodDays > 0
                      ? `${plan.trialPeriodDays} days`
                      : "None"}
                  </Tag>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Display Order:</Text>
                <div>
                  <Tag color="purple">{plan.displayOrder || "Not set"}</Tag>
                </div>
              </div>
            </Col>
          </Row>

          <Divider orientation="left" orientationMargin={0}>
            <InfoCircleOutlined /> Features
          </Divider>
          {plan.features && plan.features.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 pl-4">
              {plan.features.map((feature: string, index: number) => (
                <li key={index}>
                  <Text>
                    <CheckCircleTwoTone twoToneColor="#52c41a" /> {feature}
                  </Text>
                </li>
              ))}
            </ul>
          ) : (
            <Text type="secondary">No features</Text>
          )}

          <Divider orientation="left" orientationMargin={0}>
            <InfoCircleOutlined /> Usage Limits
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <div className="mb-3">
                <Tooltip title="Maximum number of trips allowed per month">
                  <Text strong>Trips/Month:</Text>
                </Tooltip>
                <div>
                  <Tag color="cyan">
                    {plan.limits?.maxTripsPerMonth === -1
                      ? "Unlimited"
                      : plan.limits?.maxTripsPerMonth || 0}
                  </Tag>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-3">
                <Tooltip title="Maximum collaborators allowed per trip">
                  <Text strong>Collaborators/Trip:</Text>
                </Tooltip>
                <div>
                  <Tag color="cyan">
                    {plan.limits?.maxCollaboratorsPerTrip === -1
                      ? "Unlimited"
                      : plan.limits?.maxCollaboratorsPerTrip || 0}
                  </Tag>
                </div>
              </div>
            </Col>
          </Row>

          <Divider orientation="left" orientationMargin={0}>
            <InfoCircleOutlined /> System Info
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <div className="mb-4">
                <Text strong>Created At:</Text>
                <div>
                  <Text code>
                    {new Date(plan.createdAt).toLocaleString("en-US")}
                  </Text>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-4">
                <Text strong>Last Updated:</Text>
                <div>
                  <Text code>
                    {new Date(plan.updatedAt).toLocaleString("en-US")}
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Drawer>
  );
}
