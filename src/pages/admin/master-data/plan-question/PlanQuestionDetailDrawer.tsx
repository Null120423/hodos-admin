import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Popconfirm,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";

import LoadingView from "@/components/loading-view";
import { useGetPlanQuestionById } from "@/services/hooks/admin/master-data/plan-question/useGetPlanQuestionById";

const { Title, Text } = Typography;

export default function PlanQuestionDetailDrawer({
  visible,
  question,
  questionTypeOptions,
  onClose,
  onCreateOption,
  onEditOption,
  onDeleteOption,
  isLoading,
}: any) {
  const { data: dataDetail, isLoading: isLoadingData } = useGetPlanQuestionById(
    question?.id,
  );

  if (!question?.id) {
    return (
      <Drawer
        open={visible}
        placement="right"
        title="Question Details"
        width={600}
        onClose={onClose}
      >
        <Text type="secondary">No question selected</Text>
      </Drawer>
    );
  }

  return (
    <Drawer
      open={visible}
      placement="right"
      title="Question Details"
      width={600}
      onClose={onClose}
    >
      {isLoadingData && <Spin />}
      {dataDetail && (
        <div>
          <div className="mb-6">
            <Title level={4}>{dataDetail.question}</Title>
            <div className="flex items-center space-x-2 mt-2">
              <Tag
                color={
                  questionTypeOptions.find(
                    (t: any) => t.value === question.type,
                  )?.color
                }
              >
                {
                  questionTypeOptions.find(
                    (t: any) => t.value === question.type,
                  )?.label
                }
              </Tag>
              <Tag color={question.isActive ? "green" : "red"}>
                {question.isActive ? "Active" : "Inactive"}
              </Tag>
            </div>
          </div>

          <Divider>Basic Info</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Display Order:</Text>
                <div>{dataDetail.order}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-3">
                <Text strong>Options Count:</Text>
                <div>{dataDetail?.options?.length}</div>
              </div>
            </Col>
          </Row>

          <div className="mb-4">
            <Text strong>Created At:</Text>
            <div>{new Date(dataDetail.createdAt).toLocaleString("en-US")}</div>
          </div>

          <div className="mb-4">
            <Text strong>Last Updated:</Text>
            <div>{new Date(dataDetail.updatedAt).toLocaleString("en-US")}</div>
          </div>

          <Divider>
            <div className="flex justify-between items-center">
              <span className="mr-2">Options List</span>
              <Button
                icon={<Plus size={16} />}
                size="small"
                type="primary"
                onClick={() => onCreateOption(question.id)}
              >
                Add Option
              </Button>
            </div>
          </Divider>

          {dataDetail.options && dataDetail.options.length > 0 ? (
            <div className="space-y-3">
              {dataDetail.options.map((option: any) => (
                <Card key={option.id} size="small">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {option.icon && <span>{option.icon}</span>}
                        <Text strong>{option.label}</Text>
                        <Tag>{option.value}</Tag>
                      </div>
                      {option.desc && (
                        <Text className="text-sm" type="secondary">
                          {option.desc}
                        </Text>
                      )}
                    </div>
                    <Space size="small">
                      <Button
                        icon={<Edit size={16} />}
                        size="small"
                        type="link"
                        onClick={() => onEditOption(option, question.id)}
                      />
                      <Popconfirm
                        cancelText="Cancel"
                        okText="Delete"
                        title="Are you sure you want to delete this option?"
                        onConfirm={() => onDeleteOption(option.id, question.id)}
                      >
                        <Button
                          danger
                          icon={<Trash2 size={16} />}
                          size="small"
                          type="link"
                        />
                      </Popconfirm>
                    </Space>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Text type="secondary">No options yet</Text>
          )}
        </div>
      )}
      {isLoading && <LoadingView />}
    </Drawer>
  );
}
