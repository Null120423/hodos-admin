"use client";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import { FileUp, Filter, Plus, Search } from "lucide-react";
import { Fragment, useState } from "react";

import PricingPlanDetailDrawer from "./PricingPlanDetailDrawer";
import PricingPlanModal from "./PricingPlanModal";
import PricingPlanTable from "./PricingPlanTable";
import { billingCycleOptions, currencyOptions } from "./_mock";

import useCreatePricingPlan from "@/services/hooks/admin/master-data/pricing-plan/useCreatePricingPlan";
import useDeletePricingPlan from "@/services/hooks/admin/master-data/pricing-plan/useDeletePricingPlan";
import { useGetPricingPlans } from "@/services/hooks/admin/master-data/pricing-plan/useGetPricingPlans";
import useUpdatePricingPlan from "@/services/hooks/admin/master-data/pricing-plan/useUpdatePricingPlan";

export default function PricingPlanManagementScreen() {
  const {
    data: plans,
    isLoading: isPlansLoading,
    isRefetching: isPlansRefetching,
  } = useGetPricingPlans();
  const { onDelete, isLoading: isDeleting } = useDeletePricingPlan();
  const { onUpdate, isLoading: isUpdating } = useUpdatePricingPlan();
  const { onCreate, isLoading: isCreating } = useCreatePricingPlan();
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);
  const [isPlanDetailVisible, setIsPlanDetailVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [planForm] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedCycle, setSelectedCycle] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  // Plan Management Functions
  const handleCreatePlan = () => {
    setEditingPlan(null);
    setIsPlanModalVisible(true);
    planForm.resetFields();
  };

  const handleEditPlan = (plan: any) => {
    setEditingPlan(plan);
    setIsPlanModalVisible(true);
    planForm.setFieldsValue({
      name: plan.name,
      planCode: plan.planCode,
      description: plan.description,
      price: plan.price,
      currency: plan.currency,
      billingCycle: plan.billingCycle,
      features: plan.features?.join("\n"),
      isActive: plan.isActive,
      trialPeriodDays: plan.trialPeriodDays,
      displayOrder: plan.displayOrder,
      maxTripsPerMonth: plan.limits?.maxTripsPerMonth,
      maxCollaboratorsPerTrip: plan.limits?.maxCollaboratorsPerTrip,
    });
  };

  const handleDeletePlan = async (id: string) => {
    await onDelete(id);
  };

  const handleViewPlanDetail = (plan: any) => {
    setSelectedPlan(plan);
    setIsPlanDetailVisible(true);
  };

  const handleSubmitPlan = async (values: any) => {
    const features = values.features
      ? values.features.split("\n").filter((f: string) => f.trim())
      : [];
    const limits = {
      maxTripsPerMonth: values.maxTripsPerMonth || 0,
      maxCollaboratorsPerTrip: values.maxCollaboratorsPerTrip || 0,
    };

    if (editingPlan) {
      await onUpdate({
        ...editingPlan,
        ...values,
        features,
        id: editingPlan.id,
      }).then((res) => {
        setIsPlanModalVisible(false);
        planForm.resetFields();
      });
    } else {
      // Create new plan
      const newPlan = {
        id: Date.now().toString(),
        name: values.name,
        planCode: values.planCode,
        description: values.description,
        price: values.price,
        currency: values.currency,
        billingCycle: values.billingCycle,
        features,
        isActive: values.isActive,
        trialPeriodDays: values.trialPeriodDays,
        displayOrder: values.displayOrder,
        limits,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await onCreate(newPlan).then((res) => {
        setIsPlanModalVisible(false);
        planForm.resetFields();
      });
    }
  };

  const filteredPlans = plans.filter((plan: any) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchText.toLowerCase()) ||
      plan.planCode.toLowerCase().includes(searchText.toLowerCase());
    const matchesCycle = !selectedCycle || plan.billingCycle === selectedCycle;
    const matchesStatus =
      !selectedStatus ||
      (selectedStatus === "active" ? plan.isActive : !plan.isActive);

    return matchesSearch && matchesCycle && matchesStatus;
  });

  const totalPlans = plans.length;
  const activePlans = plans.filter((p: any) => p.isActive).length;
  const totalRevenue = plans
    .filter((p: any) => p.isActive)
    .reduce((sum: any, p: any) => sum + +p.price, 0);

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Typography.Title className="m-0" level={3}>
          Pricing Plan Management
        </Typography.Title>
        <Space>
          <Button icon={<FileUp size={16} />}>Export Data</Button>
          <Button
            icon={<Plus size={16} />}
            type="primary"
            onClick={handleCreatePlan}
          >
            Create New Plan
          </Button>
        </Space>
      </div>

      <Fragment>
        {/* Statistics */}
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic prefix="📦" title="Total Plans" value={totalPlans} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                prefix="✅"
                title="Active Plans"
                value={activePlans}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                precision={2}
                prefix="💰"
                suffix="VND"
                title="Total Value"
                value={totalRevenue}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6">
          <Row gutter={16}>
            <Col span={8}>
              <Input
                allowClear
                placeholder="Search plans..."
                prefix={<Search size={16} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                allowClear
                placeholder="Filter by cycle"
                style={{ width: "100%" }}
                value={selectedCycle}
                onChange={setSelectedCycle}
              >
                {billingCycleOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    <Tag color={option.color}>{option.label}</Tag>
                  </Select.Option>
                ))}
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
                  setSelectedCycle(undefined);
                  setSelectedStatus(undefined);
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Plans Table */}
        <Card>
          <PricingPlanTable
            billingCycleOptions={billingCycleOptions}
            isLoading={isPlansLoading || isPlansRefetching || isDeleting}
            plans={filteredPlans}
            onDelete={handleDeletePlan}
            onEdit={handleEditPlan}
            onView={handleViewPlanDetail}
          />
        </Card>

        {/* Plan Create/Edit Modal */}
        <PricingPlanModal
          billingCycleOptions={billingCycleOptions}
          currencyOptions={currencyOptions}
          editingPlan={editingPlan}
          isLoading={isCreating || isUpdating}
          planForm={planForm}
          visible={isPlanModalVisible}
          onCancel={() => setIsPlanModalVisible(false)}
          onFinish={handleSubmitPlan}
        />

        {/* Plan Detail Drawer */}
        <PricingPlanDetailDrawer
          billingCycleOptions={billingCycleOptions}
          plan={selectedPlan}
          visible={isPlanDetailVisible}
          onClose={() => setIsPlanDetailVisible(false)}
        />
      </Fragment>
    </Fragment>
  );
}
