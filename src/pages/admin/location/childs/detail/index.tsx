import {
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  Layout,
  Row,
  Space,
  Spin,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { Fragment, Key, useState } from "react";
import { useLocation } from "react-router-dom";

import useLocationDetail from "@/services/hooks/admin/location/useLocationDetail";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function DetailLocationScreen() {
  const location = useLocation();
  const {
    data: locationData,
    isLoading,
    isFetching,
    isRefetching,
  } = useLocationDetail(location?.state.id ?? "");
  const [activeTab, setActiveTab] = useState("1");

  return (
    <Fragment>
      {(isLoading || isRefetching || isFetching) && <Spin />}
      {locationData && (
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane key="1" tab="Basic Information">
            <Row gutter={16}>
              <Col span={16}>
                <Card>
                  <Descriptions bordered column={2}>
                    <Descriptions.Item label="ID">
                      {locationData.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Name">
                      {locationData.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Type">
                      <Tag color="blue">{locationData.type}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Label">
                      {locationData.label}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={2}>
                      <Space>
                        <EnvironmentOutlined />
                        {locationData.address}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Coordinates">
                      {locationData.coordinates}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                      {new Date(locationData.createdAt).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>
                      <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                        {locationData.description}
                      </Paragraph>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Main Image">
                  <Image
                    alt={locationData.name}
                    src={locationData.img || "/placeholder.svg"}
                    width="100%"
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane key="2" tab="Images Gallery">
            <Card>
              <Row gutter={24}>
                <Col span={24}>
                  <div className="grid grid-cols-4 gap-4">
                    {locationData?.lstImgs &&
                      locationData?.lstImgs?.map((img: any, index: Key) => (
                        <div key={index} className="relative">
                          <Image
                            height={150}
                            src={img || "/placeholder.svg"}
                            style={{ objectFit: "cover" }}
                            width="100%"
                          />
                          <div className="absolute top-2 right-2">
                            <Space>
                              <Button icon={<EditOutlined />} size="small" />
                              <Button
                                danger
                                icon={<DeleteOutlined />}
                                size="small"
                              />
                            </Space>
                          </div>
                        </div>
                      ))}
                  </div>
                </Col>
              </Row>
            </Card>
          </TabPane>
          <TabPane key="3" tab="JSON data">
            <Card>
              <Row gutter={[24, 24]}>
                <Col span={16}>
                  <Title level={3}>{locationData.name}</Title>
                  <Text type="secondary">{locationData.address}</Text>
                  <Paragraph style={{ marginTop: 16 }}>
                    {locationData.detail?.about}
                  </Paragraph>
                  <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col>
                      <Tag color="gold">
                        ⭐ {locationData.detail?.rating} (
                        {locationData.detail?.totalReview} reviews)
                      </Tag>
                    </Col>
                    <Col>
                      <Tag color="blue">
                        Visitors:{" "}
                        {locationData.detail?.visitors?.toLocaleString()}
                      </Tag>
                    </Col>
                  </Row>
                  <Title level={4} style={{ marginTop: 24 }}>
                    Highlights
                  </Title>
                  <Row gutter={16}>
                    {locationData.detail?.highLights?.map(
                      (hl: any, idx: Key | null | undefined) => (
                        <Col key={idx} span={8}>
                          <Card bordered={false}>
                            <div style={{ fontSize: 32 }}>{hl.icon}</div>
                            <Title level={5}>{hl.title}</Title>
                            <Text type="secondary">{hl.subTitle}</Text>
                          </Card>
                        </Col>
                      )
                    )}
                  </Row>
                  <Title level={4} style={{ marginTop: 24 }}>
                    Activities
                  </Title>
                  <Row gutter={16}>
                    {locationData.detail?.activities?.map(
                      (act: any, idx: number) => (
                        <Col key={idx} span={8}>
                          <Card bordered={false}>
                            <div style={{ fontSize: 28 }}>{act.icon}</div>
                            <Title level={5}>{act.title}</Title>
                            <Text type="secondary">{act.description}</Text>
                          </Card>
                        </Col>
                      )
                    )}
                  </Row>
                  <Title level={4} style={{ marginTop: 24 }}>
                    Nearby Attractions
                  </Title>
                  <ul>
                    {locationData.detail?.nearbyAttractions?.map(
                      (attr: any, idx: number) => (
                        <li key={idx} style={{ marginBottom: 8 }}>
                          <b>{attr.name}</b> ({attr.distance} km):{" "}
                          {attr.description}
                        </li>
                      )
                    )}
                  </ul>
                  <Title level={4} style={{ marginTop: 24 }}>
                    Transportations
                  </Title>
                  <Row gutter={16}>
                    {locationData.detail?.transportations?.map(
                      (t: any, idx: Key | null | undefined) => (
                        <Col key={idx} span={8}>
                          <Card bordered={false}>
                            <div style={{ fontSize: 28 }}>{t.icon}</div>
                            <Title level={5}>{t.title}</Title>
                            <Text type="secondary">{t.description}</Text>
                          </Card>
                        </Col>
                      )
                    )}
                  </Row>
                  <Title level={4} style={{ marginTop: 24 }}>
                    Weather
                  </Title>
                  <Card bordered={false}>
                    <Row gutter={16}>
                      <Col>
                        <Text strong>Now: </Text>
                        <span style={{ fontSize: 18 }}>
                          {locationData.detail?.weather?.current?.temperature}°C
                        </span>
                        <Text type="secondary">
                          {" "}
                          (Feels like{" "}
                          {
                            locationData.detail?.weather?.current?.feelsLike
                          }°C,{" "}
                          {locationData.detail?.weather?.current?.condition})
                        </Text>
                      </Col>
                      <Col>
                        <Text>
                          Humidity:{" "}
                          {locationData.detail?.weather?.current?.humidity}
                        </Text>
                      </Col>
                      <Col>
                        <Text>
                          Wind: {locationData.detail?.weather?.current?.wind}
                        </Text>
                      </Col>
                      <Col>
                        <Text>
                          UV Index:{" "}
                          {locationData.detail?.weather?.current?.uvIndex}
                        </Text>
                      </Col>
                    </Row>
                    <Row gutter={8} style={{ marginTop: 12 }}>
                      {locationData.detail?.weather?.forecast?.map(
                        (f: any, idx: number) => (
                          <Col key={idx}>
                            <Card
                              bordered={false}
                              size="small"
                              style={{ textAlign: "center" }}
                            >
                              <div style={{ fontSize: 24 }}>{f.icon}</div>
                              <div>{f.day}</div>
                              <div>
                                {f.high} / {f.low}
                              </div>
                            </Card>
                          </Col>
                        )
                      )}
                    </Row>
                    <Row gutter={16} style={{ marginTop: 12 }}>
                      {locationData.detail?.weather?.seasons?.map(
                        (s: any, idx: number) => (
                          <Col key={idx} span={12}>
                            <Card bordered={false} size="small">
                              <b>{s.season}</b>: {s.description}
                              <br />
                              <Text type="secondary">{s.recommendation}</Text>
                            </Card>
                          </Col>
                        )
                      )}
                    </Row>
                  </Card>
                  <Title level={4} style={{ marginTop: 24 }}>
                    Reviews
                  </Title>
                  <Card bordered={false}>
                    {locationData.detail?.reviews?.map(
                      (r: any, idx: number) => (
                        <div key={idx} style={{ marginBottom: 16 }}>
                          <b>{r.name}</b> <Tag color="gold">⭐ {r.rating}</Tag>{" "}
                          <Text type="secondary">{r.date}</Text>
                          <Paragraph style={{ margin: 0 }}>
                            {r.comment}
                          </Paragraph>
                        </div>
                      )
                    )}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card bordered={false} title="Gallery">
                    <Image
                      alt={locationData.name}
                      src={locationData.img || "/placeholder.svg"}
                      style={{ marginBottom: 8 }}
                      width="100%"
                    />
                    <Row gutter={[8, 8]}>
                      {locationData.detail?.images?.map(
                        (img: any, idx: number) => (
                          <Col key={idx} span={12}>
                            <Image
                              height={80}
                              src={img}
                              style={{ objectFit: "cover" }}
                              width="100%"
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      )}
    </Fragment>
  );
}
