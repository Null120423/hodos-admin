import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Collapse, Input, Row, Select, Space } from "antd";
import { useState } from "react";

const { Panel } = Collapse;

const types = [
  { label: "Locations", value: "LOCATION" },
  { label: "Foods", value: "FOOD" },
];

export default function LocationHeader({
  onChangeVal,
}: {
  onChangeVal: (val: { searchKey: string; type: string }) => void;
}) {
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [type, setType] = useState<string>("LOCATION");

  const handleChange = () => {
    onChangeVal({
      searchKey: selectedKey,
      type: type,
    });
  };

  const handleClear = () => {
    setSelectedKey("");
    onChangeVal({ searchKey: "", type: "LOCATION" });
  };

  return (
    <Collapse>
      <Panel key="1" header="Filter">
        <Row gutter={[8, 8]} style={{ width: "100%", columnGap: 8 }}>
          <Select style={{ flex: 1 }} value={type} onChange={setType}>
            {types.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          <Input
            allowClear
            placeholder="Enter name of location"
            style={{ flex: 2 }}
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
          />
          <Space style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button
              danger
              icon={<CloseOutlined />}
              type="default"
              onClick={handleClear}
            >
              Clear filters
            </Button>
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={handleChange}
            >
              Search
            </Button>
          </Space>
        </Row>
      </Panel>
    </Collapse>
  );
}
