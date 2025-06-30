"use client";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import { FileUp, Filter, Plus, Search } from "lucide-react";
import { Fragment, useState } from "react";

import { PlanQuestionType } from "./_mock";
import PlanOptionModal from "./PlanOptionModal";
import PlanQuestionDetailDrawer from "./PlanQuestionDetailDrawer";
import PlanQuestionModal from "./PlanQuestionModal";
import PlanQuestionTable from "./PlanQuestionTable";

import useCreatePlanQuestionOption from "@/services/hooks/admin/master-data/plan-question/options/useCreatePlanQuestionOption";
import useDeletePlanQuestionOption from "@/services/hooks/admin/master-data/plan-question/options/useDeletePlanQuestionOption";
import useUpdatePlanQuestionsOption from "@/services/hooks/admin/master-data/plan-question/options/useUpdatePlanQuestionOption";
import useCreatePlanQuestion from "@/services/hooks/admin/master-data/plan-question/useCreatePlanQuestion";
import useDeletePlanQuestion from "@/services/hooks/admin/master-data/plan-question/useDeletePlanQuestion";
import { useGetPlanQuestions } from "@/services/hooks/admin/master-data/plan-question/useGetPlanQuestions";
import useUpdatePlanQuestions from "@/services/hooks/admin/master-data/plan-question/useUpdatePlanQuestion";

const questionTypeOptions = [
  {
    label: "Single Choice",
    value: PlanQuestionType.SINGLE_CHOICE,
    color: "blue",
  },
  {
    label: "Multi Choice",
    value: PlanQuestionType.MULTI_CHOICE,
    color: "green",
  },
  { label: "Date Range", value: PlanQuestionType.DATE_RANGE, color: "orange" },
];

export default function PlanQuestionManagementScreen() {
  const { data: questions, isLoading, isRefetching } = useGetPlanQuestions();
  const { onUpdate, isLoading: isUpdating } = useUpdatePlanQuestions();
  const { onDelete, isLoading: isDeleting } = useDeletePlanQuestion();
  const { onCreate, isLoading: isCreating } = useCreatePlanQuestion();
  const { onCreate: onCreateOption, isLoading: isLoadingCreateOption } =
    useCreatePlanQuestionOption();
  const { onUpdate: onUpdateOptions, isLoading: isLoadingUpdateOption } =
    useUpdatePlanQuestionsOption();
  const { onDelete: onDeleteOption, isLoading: isLoadingDeletingOption } =
    useDeletePlanQuestionOption();
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
  const [isQuestionDetailVisible, setIsQuestionDetailVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [editingOption, setEditingOption] = useState<any>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [questionForm] = Form.useForm();
  const [optionForm] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  // Question Management Functions
  const handleCreateQuestion = () => {
    setEditingQuestion(null);
    setIsQuestionModalVisible(true);
    questionForm.resetFields();
  };

  const handleEditQuestion = (question: any) => {
    setEditingQuestion(question);
    setIsQuestionModalVisible(true);
    questionForm.setFieldsValue({
      question: question.question,
      type: question.type,
      order: question.order,
      isDeleted: question.isDeleted,
      isActive: !question.isDeleted,
    });
  };

  const handleDeleteQuestion = (id: string) => {
    onDelete(id);
  };

  const handleViewQuestionDetail = (question: any) => {
    setSelectedQuestion(question);
    setIsQuestionDetailVisible(true);
  };

  const handleSubmitQuestion = async (values: any) => {
    if (editingQuestion) {
      await onUpdate({
        id: editingQuestion.id,
        ...values,
        isDeleted: values.isDeleted,
      }).then(() => {
        setIsQuestionModalVisible(false);
        questionForm.resetFields();
      });
    } else {
      // Create new question
      const newQuestion = {
        id: Date.now().toString(),
        question: values.question,
        type: values.type,
        order: values.order,
        isDeleted: values.isDeleted,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        options: [],
      };

      await onCreate(newQuestion).then(() => {
        setIsQuestionModalVisible(false);
        questionForm.resetFields();
      });
    }
  };

  // Option Management Functions
  const handleCreateOption = (questionId: string) => {
    setEditingOption(null);
    setSelectedQuestion(questions.find((q: any) => q.id === questionId));
    setIsOptionModalVisible(true);
    optionForm.resetFields();
  };

  const handleEditOption = (option: any, questionId: string) => {
    setEditingOption(option);
    setSelectedQuestion(questions.find((q: any) => q.id === questionId));
    setIsOptionModalVisible(true);
    optionForm.setFieldsValue({
      label: option.label,
      desc: option.desc,
      icon: option.icon,
      value: option.value,
    });
  };

  const handleDeleteOption = (optionId: string) => {
    onDeleteOption(optionId);
  };

  const handleSubmitOption = async (values: any) => {
    if (editingOption) {
      const body = {
        questionId: selectedQuestion.id,
        ...values,
        id: editingOption.id,
      };

      await onUpdateOptions(body).then(() => {
        setIsOptionModalVisible(false);
        optionForm.resetFields();
      });
    } else {
      const newOption = {
        id: Date.now().toString(),
        ...values,
        questionId: selectedQuestion.id,
      };

      await onCreateOption(newOption).then(() => {
        setIsOptionModalVisible(false);
        optionForm.resetFields();
      });
    }
  };

  const filteredQuestions = questions.filter((question: any) => {
    const matchesSearch = question.question
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesType = !selectedType || question.type === selectedType;
    const matchesStatus =
      !selectedStatus ||
      (selectedStatus === "active" ? !question.isDeleted : question.isDeleted);

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalQuestions = questions.length;
  const activeQuestions = questions.filter((q: any) => !q.isDeleted).length;
  const totalOptions = questions.reduce(
    (sum: any, q: any) => sum + q?.options?.length,
    0,
  );

  return (
    <Fragment>
      <div className="flex justify-between items-center p-2 ">
        <Typography.Title className="m-0" level={3}>
          Plan Question Management
        </Typography.Title>
        <Space>
          <Button icon={<FileUp size={16} />}>Export Data</Button>
          <Button
            icon={<Plus size={16} />}
            type="primary"
            onClick={handleCreateQuestion}
          >
            Create New Question
          </Button>
        </Space>
      </div>

      <Layout.Content>
        <Row className="mb-2" gutter={16}>
          <Col span={8}>
            <Card className="bg-white/50">
              <Statistic
                prefix="❓"
                title="Total Questions"
                value={totalQuestions}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="bg-white/50">
              <Statistic
                prefix="✅"
                title="Active Questions"
                value={activeQuestions}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="bg-white/50">
              <Statistic
                prefix="📝"
                title="Total Options"
                value={totalOptions}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card>
          <Row gutter={16}>
            <Col span={8}>
              <Input
                allowClear
                placeholder="Search questions..."
                prefix={<Search size={16} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                allowClear
                placeholder="Filter by type"
                style={{ width: "100%" }}
                value={selectedType}
                onChange={setSelectedType}
              >
                {questionTypeOptions.map((option) => (
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
                  setSelectedType(undefined);
                  setSelectedStatus(undefined);
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Questions Table */}
        <Card>
          <PlanQuestionTable
            isLoading={isLoading || isRefetching || isDeleting}
            questionTypeOptions={questionTypeOptions}
            questions={filteredQuestions}
            onCreateOption={handleCreateOption}
            onDelete={handleDeleteQuestion}
            onEdit={handleEditQuestion}
            onView={handleViewQuestionDetail}
          />
        </Card>

        {/* Question Create/Edit Modal */}
        <PlanQuestionModal
          editingQuestion={editingQuestion}
          questionForm={questionForm}
          questionTypeOptions={questionTypeOptions}
          visible={isQuestionModalVisible}
          onCancel={() => setIsQuestionModalVisible(false)}
          onFinish={handleSubmitQuestion}
        />

        {/* Option Create/Edit Modal */}
        <PlanOptionModal
          editingOption={editingOption}
          isLoading={isCreating || isUpdating}
          optionForm={optionForm}
          visible={isOptionModalVisible}
          onCancel={() => setIsOptionModalVisible(false)}
          onFinish={handleSubmitOption}
        />

        {/* Question Detail Drawer */}
        {selectedQuestion && (
          <PlanQuestionDetailDrawer
            isLoading={
              isLoadingUpdateOption ||
              isLoadingDeletingOption ||
              isLoadingCreateOption
            }
            question={selectedQuestion}
            questionTypeOptions={questionTypeOptions}
            visible={isQuestionDetailVisible}
            onClose={() => setIsQuestionDetailVisible(false)}
            onCreateOption={handleCreateOption}
            onDeleteOption={handleDeleteOption}
            onEditOption={handleEditOption}
          />
        )}
      </Layout.Content>
    </Fragment>
  );
}
