import type { ColumnsType } from "antd/es/table";

import {
  EditOutlined,
  EyeOutlined,
  PauseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Image,
  Pagination,
  Popover,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";

import LocationHeader from "./header";

import { useRouter } from "@/routes/hooks";
import { ADMIN_ROUTES } from "@/routes/routes";
import useLocationPagination from "@/services/hooks/admin/location/useLocationPagination";

const { Option } = Select;

function Locations() {
  const router = useRouter();
  const [where, setWhere] = useState({
    searchKey: "",
    pageIndex: 1,
    pageSize: 5,
    type: "LOCATION",
  });
  const { data, isLoading, total, refetch, isRefetching } =
    useLocationPagination({
      where: {
        ...where,
        name: where.searchKey,
      },
      skip: (where.pageIndex - 1) * where.pageSize,
      take: where.pageSize,
    });

  const handlePageChange = (pageIndex: number, pageSize?: number) => {
    setWhere((prev) => ({
      ...prev,
      pageIndex,
      pageSize: pageSize ?? prev.pageSize,
    }));
  };

  const handlePageSizeChange = (size: number, val: number) => {
    setWhere((prev) => ({
      ...prev,
      pageSize: size,
      pageIndex: 1,
    }));
  };

  const handleAction = (action: string, record: any) => {
    switch (action) {
      case "view":
        router.push(ADMIN_ROUTES.LOCATION_DETAIL, {
          id: record.id,
        });
        break;
      case "edit":
        router.push(ADMIN_ROUTES.LOCATION_EDIT, {
          id: record.id,
        });
        break;
      case "delete":
        break;
      case "gallery":
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    refetch();
  }, [where]);

  const columns: ColumnsType<any> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "IMAGE",
      dataIndex: "img",
      key: "img",
      render: (img: string) => (
        <Image
          alt="Location Image"
          height={50}
          src={img}
          style={{
            borderRadius: 8,
          }}
          width={50}
        />
      ),
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "COORDINATES",
      dataIndex: "coordinates",
      key: "coordinates",
    },
    {
      title: "LABEL",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, record) => (
        <Row
          align="middle"
          gutter={[8, 8]}
          justify="center"
          style={{ columnGap: 8 }}
        >
          {/* View */}
          <Tooltip title="View">
            <Button
              shape="circle"
              onClick={() => {
                handleAction("view", record);
              }}
            >
              <EyeOutlined />
            </Button>
          </Tooltip>
          {/* Edit */}
          <Tooltip title="Edit">
            <Button
              shape="circle"
              onClick={() => {
                handleAction("edit", record);
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          {record?.isDeleted ? (
            <Tooltip title="ACTIVE">
              <Popover
                content={
                  <div>
                    <p>Are you sure you want to activate this location?</p>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => handleAction("active", record)}
                    >
                      Confirm
                    </Button>
                  </div>
                }
                trigger="click"
              >
                <Button shape="circle" type="primary">
                  <PauseCircleOutlined />
                </Button>
              </Popover>
            </Tooltip>
          ) : (
            <Tooltip title="STOP">
              <Popover
                content={
                  <div>
                    <p>Are you sure you want to stop this location?</p>
                    <Button
                      danger
                      size="small"
                      type="primary"
                      onClick={() => handleAction("stop", record)}
                    >
                      Confirm
                    </Button>
                  </div>
                }
                trigger="click"
              >
                <Tooltip title="Gallery">
                  <Button
                    danger
                    shape="circle"
                    onClick={() => {
                      handleAction("gallery", record);
                    }}
                  >
                    <StopOutlined />
                  </Button>
                </Tooltip>
              </Popover>
            </Tooltip>
          )}
        </Row>
      ),
      width: 120,
      fixed: "right",
      align: "right",
      responsive: ["md"],
    },
  ];

  return (
    <>
      <LocationHeader
        onChangeVal={(val) => {
          setWhere((prev) => ({
            ...prev,
            ...val,
          }));
        }}
      />
      <Table
        className="mt-4"
        columns={columns}
        dataSource={data}
        loading={isLoading || isRefetching}
        locale={{
          emptyText: "No locations found.",
        }}
        pagination={false}
        rowKey="id"
        size="small"
      />
      {total > 0 && (
        <div className="w-[100%] mt-4 flex justify-start items-center gap-4">
          Page size :
          <Select
            style={{ width: 120 }}
            value={where.pageSize}
            onChange={(val) => handlePageSizeChange(1, val)}
          >
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
          </Select>
          <Pagination
            current={where.pageIndex}
            pageSize={where.pageSize}
            showSizeChanger={false}
            total={total}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}

export default Locations;
