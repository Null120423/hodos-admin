"use client";

import {
  BarChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  CrownOutlined,
  CustomerServiceOutlined,
  ExclamationCircleOutlined,
  GiftOutlined,
  InfoCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  message,
  Modal,
  Progress,
  QRCode,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Key, useState } from "react";

dayjs.extend(relativeTime);

const { Title, Text, Paragraph } = Typography;

export default function JSONView({ subscriptionData }: any) {
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const { userSubscription, pricingPlan, transaction } = subscriptionData;
  const formatCurrency = (amount: string, currency: string) => {
    const numAmount = Number.parseFloat(amount);

    if (currency === "VND") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(numAmount);
    }

    return `${numAmount.toLocaleString()} ${currency}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "success",
      pending: "warning",
      cancelled: "error",
      expired: "default",
      trial: "blue",
    };

    return colors[status as keyof typeof colors] || "default";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      active: <CheckCircleOutlined />,
      pending: <ClockCircleOutlined />,
      cancelled: <StopOutlined />,
      expired: <ExclamationCircleOutlined />,
      trial: <GiftOutlined />,
    };

    return icons[status as keyof typeof icons] || <ClockCircleOutlined />;
  };

  const getFeatureIcon = (feature: string) => {
    const icons = {
      "Unlimited Trips": <InfoCircleOutlined />,
      "Advanced Analytics": <BarChartOutlined />,
      "Priority Support": <CustomerServiceOutlined />,
    };

    return icons[feature as keyof typeof icons] || <CheckCircleOutlined />;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard!");
  };

  const handleCancelSubscription = () => {
    setCancelModalVisible(false);
    message.success("Subscription cancellation request submitted");
  };

  const calculateProgress = () => {
    const start = dayjs(userSubscription.startDate);
    const end = dayjs(userSubscription.currentPeriodEndDate);
    const now = dayjs();
    const total = end.diff(start, "day");
    const elapsed = now.diff(start, "day");

    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const daysRemaining = dayjs(userSubscription.currentPeriodEndDate).diff(
    dayjs(),
    "day"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Title className="mb-2" level={2}>
            <CrownOutlined className="mr-2 text-yellow-500" />
            Subscription Management
          </Title>
          <Text type="secondary">
            Manage your subscription plan and billing information
          </Text>
        </div>

        {/* Status Alert */}
        {transaction.status === "pending" && (
          <Alert
            showIcon
            action={
              <Button size="small" onClick={() => setQrModalVisible(true)}>
                View QR Code
              </Button>
            }
            className="mb-6"
            description="Your payment is being processed. Please complete the payment using the QR code below."
            message="Payment Pending"
            type="warning"
          />
        )}

        <Row gutter={[24, 24]}>
          {/* Left Column */}
          <Col lg={16} xs={24}>
            {/* Current Plan */}
            <Card className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Title className="mb-0" level={3}>
                  Current Plan
                </Title>
                <Badge
                  status={getStatusColor(userSubscription.status) as any}
                  text={
                    <span className="capitalize font-medium">
                      {getStatusIcon(userSubscription.status)}{" "}
                      {userSubscription.status}
                    </span>
                  }
                />
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Title className="text-white mb-2" level={2}>
                      {pricingPlan.name}
                    </Title>
                    <Text className="text-blue-100 text-lg">
                      {pricingPlan.description}
                    </Text>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      {formatCurrency(pricingPlan.price, pricingPlan.currency)}
                    </div>
                    <Text className="text-blue-100">
                      per {pricingPlan.billingCycle}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Features */}
              <Title className="mb-3" level={4}>
                Plan Features
              </Title>
              <Row gutter={[16, 16]}>
                {pricingPlan.features.map(
                  (feature: any, index: Key | null | undefined) => (
                    <Col key={index} sm={12} xs={24}>
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <div className="text-green-500 mr-3">
                          {getFeatureIcon(feature)}
                        </div>
                        <Text strong>{feature}</Text>
                      </div>
                    </Col>
                  )
                )}
              </Row>

              {/* Usage Limits */}
              <Divider />
              <Title className="mb-3" level={4}>
                Usage Limits
              </Title>
              <Row gutter={[16, 16]}>
                <Col sm={12} xs={24}>
                  <Card className="text-center" size="small">
                    <div className="text-2xl font-bold text-blue-500 mb-1">
                      {pricingPlan.limits.maxTripsPerMonth}
                    </div>
                    <Text type="secondary">Max Trips per Month</Text>
                  </Card>
                </Col>
                <Col sm={12} xs={24}>
                  <Card className="text-center" size="small">
                    <div className="text-2xl font-bold text-purple-500 mb-1">
                      {pricingPlan.limits.maxCollaboratorsPerTrip}
                    </div>
                    <Text type="secondary">Max Collaborators per Trip</Text>
                  </Card>
                </Col>
              </Row>
            </Card>

            {/* Billing Information */}
            <Card title="Billing Information">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Subscription ID">
                  <Text code>{userSubscription.id}</Text>
                  <Button
                    icon={<CopyOutlined />}
                    size="small"
                    type="text"
                    onClick={() => copyToClipboard(userSubscription.id)}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                  {dayjs(userSubscription.startDate).format("MMMM DD, YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Current Period">
                  {dayjs(userSubscription.startDate).format("MMM DD")} -{" "}
                  {dayjs(userSubscription.currentPeriodEndDate).format(
                    "MMM DD, YYYY"
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Next Payment">
                  <Space>
                    <CalendarOutlined />
                    {dayjs(userSubscription.nextPaymentDate).format(
                      "MMMM DD, YYYY"
                    )}
                    <Tag color="blue">
                      {dayjs(userSubscription.nextPaymentDate).fromNow()}
                    </Tag>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Auto Renewal">
                  <Tag
                    color={userSubscription.autoRenew ? "success" : "warning"}
                  >
                    {userSubscription.autoRenew ? "Enabled" : "Disabled"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Billing Cycle Progress">
                  <div className="w-full">
                    <Progress
                      percent={Math.round(calculateProgress())}
                      status="active"
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                    />
                    <Text className="text-sm" type="secondary">
                      {daysRemaining} days remaining in current period
                    </Text>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* Right Column */}
          <Col lg={8} xs={24}>
            {/* Support */}
            <Card className="mt-6" title="Need Help?">
              <Paragraph>
                <Text type="secondary">
                  Have questions about your subscription? Our support team is
                  here to help.
                </Text>
              </Paragraph>
              <Button block icon={<CustomerServiceOutlined />} type="primary">
                Contact Support
              </Button>
            </Card>
          </Col>
        </Row>

        {/* QR Code Modal */}
        <Modal
          footer={[
            <Button key="close" onClick={() => setQrModalVisible(false)}>
              Close
            </Button>,
            <Button
              key="copy"
              icon={<CopyOutlined />}
              type="primary"
              onClick={() => copyToClipboard(transaction.metadata.qrCode)}
            >
              Copy QR Link
            </Button>,
          ]}
          open={qrModalVisible}
          title="Complete Payment"
          width={400}
          onCancel={() => setQrModalVisible(false)}
        >
          <div className="text-center">
            <Title level={4}>Scan QR Code to Pay</Title>
            <Text className="block mb-4" type="secondary">
              Amount: {formatCurrency(transaction.amount, transaction.currency)}
            </Text>
            <div className="flex justify-center mb-4">
              <QRCode size={200} value={transaction.metadata.qrCode} />
            </div>
            <Alert
              showIcon
              description="Scan this QR code with your banking app to complete the payment. The transaction will be processed automatically."
              message="Payment Instructions"
              type="info"
            />
          </div>
        </Modal>

        {/* Cancel Subscription Modal */}
        <Modal
          okButtonProps={{ danger: true }}
          okText="Confirm Cancellation"
          open={cancelModalVisible}
          title="Cancel Subscription"
          onCancel={() => setCancelModalVisible(false)}
          onOk={handleCancelSubscription}
        >
          <Alert
            showIcon
            className="mb-4"
            description="Your subscription will remain active until the end of the current billing period. You will lose access to premium features after that."
            message="Are you sure you want to cancel your subscription?"
            type="warning"
          />
          <Paragraph>
            <Text strong>Current period ends:</Text>{" "}
            {dayjs(userSubscription.currentPeriodEndDate).format(
              "MMMM DD, YYYY"
            )}
          </Paragraph>
          <Paragraph>
            <Text type="secondary">
              You can reactivate your subscription at any time before the
              current period ends.
            </Text>
          </Paragraph>
        </Modal>
      </div>
    </div>
  );
}
