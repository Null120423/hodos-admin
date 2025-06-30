/* eslint-disable react/jsx-key */
"use client";

import type { UploadFile, UploadProps } from "antd";

import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  List,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Steps,
  Tag,
  Typography,
  Upload,
} from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import useLocationDetail from "@/services/hooks/admin/location/useLocationDetail";

const { Header, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

export default function EditLocationScreen() {
  const locationId = useLocation().state?.id;
  const {
    data: locationData,
    isLoading,
    isFetching,
    isRefetching,
  } = useLocationDetail(locationId ?? "");
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setSaving] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [highlights, setHighlights] = useState(
    locationData?.detail?.highLights
  );
  const [activities, setActivities] = useState(
    locationData?.detail?.activities
  );
  const [nearbyAttractions, setNearbyAttractions] = useState(
    locationData?.detail?.nearbyAttractions
  );
  const [transportations, setTransportations] = useState(
    locationData?.detail?.transportations
  );
  const [highlightModalVisible, setHighlightModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [attractionModalVisible, setAttractionModalVisible] = useState(false);
  const [transportModalVisible, setTransportModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const steps = [
    {
      title: "Basic Info",
      description: "Location details",
    },
    {
      title: "Images",
      description: "Photo gallery",
    },
    {
      title: "Content",
      description: "Highlights & activities",
    },
    {
      title: "Nearby",
      description: "Attractions & transport",
    },
    {
      title: "Review",
      description: "Final review",
    },
  ];

  const handleSave = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();

      console.log("Saving location data:", values);
      message.success("Location updated successfully!");
      // Here you would typically make an API call to save the data
    } catch (error) {
      message.error("Please check all required fields");
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || file.preview || "");
    setPreviewVisible(true);
  };

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const addHighlight = (item: any) => {
    if (editingItem) {
      setHighlights(
        highlights.map((h, i) => (i === editingItem.index ? item : h))
      );
    } else {
      setHighlights([...highlights, item]);
    }
    setHighlightModalVisible(false);
    setEditingItem(null);
  };

  const addActivity = (item: any) => {
    if (editingItem) {
      setActivities(
        activities.map((a, i) => (i === editingItem.index ? item : a))
      );
    } else {
      setActivities([...activities, item]);
    }
    setActivityModalVisible(false);
    setEditingItem(null);
  };

  const addAttraction = (item: any) => {
    if (editingItem) {
      setNearbyAttractions(
        nearbyAttractions.map((a, i) => (i === editingItem.index ? item : a))
      );
    } else {
      setNearbyAttractions([...nearbyAttractions, item]);
    }
    setAttractionModalVisible(false);
    setEditingItem(null);
  };

  const addTransport = (item: any) => {
    if (editingItem) {
      setTransportations(
        transportations.map((t, i) => (i === editingItem.index ? item : t))
      );
    } else {
      setTransportations([...transportations, item]);
    }
    setTransportModalVisible(false);
    setEditingItem(null);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card title="Basic Information">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Location Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter location name" },
                  ]}
                >
                  <Input placeholder="Enter location name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Location Type"
                  name="type"
                  rules={[
                    { required: true, message: "Please select location type" },
                  ]}
                >
                  <Select placeholder="Select type">
                    <Option value="LOCATION">Location</Option>
                    <Option value="RESTAURANT">Restaurant</Option>
                    <Option value="HOTEL">Hotel</Option>
                    <Option value="ATTRACTION">Attraction</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input
                placeholder="Enter full address"
                prefix={<EnvironmentOutlined />}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Coordinates"
                  name="coordinates"
                  rules={[
                    { required: true, message: "Please enter coordinates" },
                  ]}
                >
                  <Input placeholder="lat,lng (e.g., 10.772009,106.698361)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Label/Slug" name="label">
                  <Input placeholder="URL-friendly identifier" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <TextArea
                placeholder="Detailed description of the location"
                rows={6}
              />
            </Form.Item>

            <Form.Item label="About (Short Description)" name="about">
              <TextArea placeholder="Brief overview for visitors" rows={3} />
            </Form.Item>
          </Card>
        );

      case 1:
        return (
          <Card title="Image Gallery">
            <Form.Item label="Main Image" name="mainImage">
              <Upload
                beforeUpload={() => false}
                fileList={fileList}
                listType="picture-card"
                onChange={handleUploadChange}
                onPreview={handlePreview}
              >
                {fileList.length >= 8 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Divider />

            <div className="mb-4">
              <Title level={5}>Current Images</Title>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative">
                    <img
                      alt={`Current ${i}`}
                      className="w-full h-32 object-cover rounded border"
                      src={`/placeholder.svg?height=150&width=200`}
                    />
                    <div className="absolute top-2 right-2">
                      <Space>
                        <Button icon={<EyeOutlined />} size="small" />
                        <Button danger icon={<DeleteOutlined />} size="small" />
                      </Space>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Modal
              footer={null}
              open={previewVisible}
              title="Image Preview"
              onCancel={() => setPreviewVisible(false)}
            >
              <img
                alt="preview"
                src={previewImage || "/placeholder.svg"}
                style={{ width: "100%" }}
              />
            </Modal>
          </Card>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card
              extra={
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => setHighlightModalVisible(true)}
                >
                  Add Highlight
                </Button>
              }
              title="Highlights"
            >
              <List
                dataSource={highlights}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={<Avatar>{item.icon}</Avatar>}
                      description={item.subTitle}
                      title={item.title}
                    />
                    <List.Item
                      actions={[
                        <Button
                          icon={<EditOutlined />}
                          type="link"
                          onClick={() => {
                            setEditingItem({ ...item, index });
                            setHighlightModalVisible(true);
                          }}
                        />,
                        <Popconfirm
                          title="Delete this highlight?"
                          onConfirm={() =>
                            setHighlights(
                              highlights.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            type="link"
                          />
                        </Popconfirm>,
                      ]}
                    />
                  </List.Item>
                )}
              />
            </Card>

            <Card
              extra={
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => setActivityModalVisible(true)}
                >
                  Add Activity
                </Button>
              }
              title="Activities"
            >
              <List
                dataSource={activities}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={<Avatar>{item.icon}</Avatar>}
                      description={item.description}
                      title={item.title}
                    />
                    <List.Item
                      actions={[
                        <Button
                          icon={<EditOutlined />}
                          type="link"
                          onClick={() => {
                            setEditingItem({ ...item, index });
                            setActivityModalVisible(true);
                          }}
                        />,
                        <Popconfirm
                          title="Delete this activity?"
                          onConfirm={() =>
                            setActivities(
                              activities.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            type="link"
                          />
                        </Popconfirm>,
                      ]}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card
              extra={
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => setAttractionModalVisible(true)}
                >
                  Add Attraction
                </Button>
              }
              title="Nearby Attractions"
            >
              <List
                dataSource={nearbyAttractions}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      description={item.description}
                      title={
                        <Space>
                          {item.name}
                          <Tag color="blue">{item.distance} km</Tag>
                        </Space>
                      }
                    />
                    <List.Item
                      actions={[
                        <Button
                          icon={<EditOutlined />}
                          type="link"
                          onClick={() => {
                            setEditingItem({ ...item, index });
                            setAttractionModalVisible(true);
                          }}
                        />,
                        <Popconfirm
                          title="Delete this attraction?"
                          onConfirm={() =>
                            setNearbyAttractions(
                              nearbyAttractions.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            type="link"
                          />
                        </Popconfirm>,
                      ]}
                    />
                  </List.Item>
                )}
              />
            </Card>

            <Card
              extra={
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => setTransportModalVisible(true)}
                >
                  Add Transport
                </Button>
              }
              title="Transportation Options"
            >
              <List
                dataSource={transportations}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={<Avatar>{item.icon}</Avatar>}
                      description={item.description}
                      title={item.title}
                    />
                    <List.Item
                      actions={[
                        <Button
                          icon={<EditOutlined />}
                          type="link"
                          onClick={() => {
                            setEditingItem({ ...item, index });
                            setTransportModalVisible(true);
                          }}
                        />,
                        <Popconfirm
                          title="Delete this transport option?"
                          onConfirm={() =>
                            setTransportations(
                              transportations.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            type="link"
                          />
                        </Popconfirm>,
                      ]}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        );

      case 4:
        return (
          <Card title="Review & Save">
            <div className="space-y-4">
              <div>
                <Title level={5}>Location Summary</Title>
                <p>
                  <strong>Name:</strong>{" "}
                  {form.getFieldValue("name") || locationData?.name}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {form.getFieldValue("type") || locationData?.type}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {form.getFieldValue("address") || locationData?.address}
                </p>
              </div>

              <Divider />

              <div>
                <Title level={5}>Content Summary</Title>
                <p>
                  <strong>Highlights:</strong> {highlights.length} items
                </p>
                <p>
                  <strong>Activities:</strong> {activities.length} items
                </p>
                <p>
                  <strong>Nearby Attractions:</strong>{" "}
                  {nearbyAttractions.length} items
                </p>
                <p>
                  <strong>Transportation Options:</strong>{" "}
                  {transportations.length} items
                </p>
              </div>

              <Divider />

              <div>
                <Title level={5}>Images</Title>
                <p>
                  <strong>Uploaded Images:</strong> {fileList.length} files
                </p>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      {isLoading || isFetching || isRefetching ? <Spin /> : null}
      <div className="flex justify-between items-center pl-2 pr-2">
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
          >
            Back to Admin
          </Button>
        </Space>
        <Title className="mt-2" level={3}>
          Edit Location - {locationData?.name}
        </Title>
        <Space>
          <Button onClick={() => form.resetFields()}>Reset</Button>
          <Button
            icon={<SaveOutlined />}
            loading={loading}
            type="primary"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Space>
      </div>

      <Content className="p-6 ">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-6">
            <Steps className="mb-6" current={currentStep}>
              {steps.map((step, index) => (
                <Step
                  key={index}
                  description={step.description}
                  style={{ cursor: "pointer" }}
                  title={step.title}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </Steps>
          </Card>

          <Form
            form={form}
            initialValues={locationData}
            layout="vertical"
            onFinish={handleSave}
          >
            {renderStepContent()}
          </Form>

          <div className="flex justify-between mt-6">
            <Button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
            <Button
              disabled={currentStep === steps.length - 1}
              type="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Modals */}
        {/* <Modal
          footer={null}
          open={highlightModalVisible}
          title={editingItem ? "Edit Highlight" : "Add Highlight"}
          onCancel={() => {
            setHighlightModalVisible(false);
            setEditingItem(null);
          }}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={addHighlight}
          >
            <Form.Item
              label="Icon (Emoji)"
              name="icon"
              rules={[{ required: true }]}
            >
              <Input placeholder="🛍️" />
            </Form.Item>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item
              label="Subtitle"
              name="subTitle"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Enter subtitle" rows={2} />
            </Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setHighlightModalVisible(false)}>
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                {editingItem ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          footer={null}
          open={activityModalVisible}
          title={editingItem ? "Edit Activity" : "Add Activity"}
          onCancel={() => {
            setActivityModalVisible(false);
            setEditingItem(null);
          }}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={addActivity}
          >
            <Form.Item
              label="Icon (Emoji)"
              name="icon"
              rules={[{ required: true }]}
            >
              <Input placeholder="🛒" />
            </Form.Item>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Enter description" rows={3} />
            </Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setActivityModalVisible(false)}>
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                {editingItem ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          footer={null}
          open={attractionModalVisible}
          title={editingItem ? "Edit Attraction" : "Add Nearby Attraction"}
          onCancel={() => {
            setAttractionModalVisible(false);
            setEditingItem(null);
          }}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={addAttraction}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Enter attraction name" />
            </Form.Item>
            <Form.Item
              label="Distance (km)"
              name="distance"
              rules={[{ required: true }]}
            >
              <InputNumber
                className="w-full"
                min={0}
                placeholder="0.5"
                step={0.1}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Enter description" rows={3} />
            </Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setAttractionModalVisible(false)}>
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                {editingItem ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          footer={null}
          open={transportModalVisible}
          title={editingItem ? "Edit Transport" : "Add Transportation"}
          onCancel={() => {
            setTransportModalVisible(false);
            setEditingItem(null);
          }}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={addTransport}
          >
            <Form.Item
              label="Icon (Emoji)"
              name="icon"
              rules={[{ required: true }]}
            >
              <Input placeholder="🚖" />
            </Form.Item>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="Enter transport type" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Enter description" rows={3} />
            </Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setTransportModalVisible(false)}>
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                {editingItem ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal> */}
      </Content>
    </Layout>
  );
}
