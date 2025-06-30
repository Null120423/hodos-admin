/* eslint-disable react/jsx-sort-props */
"use client";

import { addToast } from "@heroui/react";
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

import { bankOptions, currencyOptions } from "./_mock";
import ReceivingBankDetailDrawer from "./ReceivingBankDetailDrawer";
import ReceivingBankModal from "./ReceivingBankModal";
import ReceivingBankTable from "./ReceivingBankTable";

import useCreateReceivingBank from "@/services/hooks/admin/master-data/receiving-bank/useCreateReceivingBank";
import useDeleteReceivingBank from "@/services/hooks/admin/master-data/receiving-bank/useDeleteReceivingBank";
import { useGetReceivingBanks } from "@/services/hooks/admin/master-data/receiving-bank/useGetReceivingBanks";
import useUpdateReceivingBank from "@/services/hooks/admin/master-data/receiving-bank/useUpdateReceivingBank";

export default function ReceivingBankManagementScreen() {
  const { data, isLoading, isRefetching } = useGetReceivingBanks();
  const { onDelete, isLoading: isLoadingDelete } = useDeleteReceivingBank();
  const { onUpdate, isLoading: isLoadingUpdate } = useUpdateReceivingBank();
  const { onCreate, isLoading: isLoadingCreate } = useCreateReceivingBank();
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);
  const [isBankDetailVisible, setIsBankDetailVisible] = useState(false);
  const [editingBank, setEditingBank] = useState<any>(null);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [bankForm] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<
    string | undefined
  >();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const handleCreateBank = () => {
    setEditingBank(null);
    setIsBankModalVisible(true);
    bankForm.resetFields();
  };

  const handleEditBank = (bank: any) => {
    setEditingBank(bank);
    setIsBankModalVisible(true);
    bankForm.setFieldsValue({
      bankName: bank.bankName,
      bankCode: bank.bankCode,
      accountNumber: bank.accountNumber,
      accountHolderName: bank.accountHolderName,
      branchName: bank.branchName,
      currency: bank.currency,
      isActive: bank.isActive,
    });
  };

  const handleDeleteBank = (id: string) => {
    onDelete(id);
  };

  const handleViewBankDetail = (bank: any) => {
    setSelectedBank(bank);
    setIsBankDetailVisible(true);
  };

  const handleSubmitBank = async (values: any) => {
    if (editingBank) {
      if (values)
        await onUpdate({ id: editingBank.id, ...values }).then((res) => {
          setIsBankModalVisible(false);
          bankForm.resetFields();
        });
      else {
        addToast({
          title: "Error",
          description: "Bank not found for update",
          color: "danger",
        });
      }
    } else {
      // Create new bank
      const newBank = {
        id: Date.now().toString(),
        bankName: values.bankName,
        bankCode: values.bankCode,
        accountNumber: values.accountNumber,
        accountHolderName: values.accountHolderName,
        branchName: values.branchName,
        currency: values.currency,
        isActive: values.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await onCreate(newBank).then((res) => {
        setIsBankModalVisible(false);
        bankForm.resetFields();
      });
    }
  };

  const filteredBanks = data.filter((bank: any) => {
    const matchesSearch =
      bank.bankName.toLowerCase().includes(searchText.toLowerCase()) ||
      bank.bankCode.toLowerCase().includes(searchText.toLowerCase()) ||
      bank.accountHolderName.toLowerCase().includes(searchText.toLowerCase()) ||
      bank.accountNumber.includes(searchText);
    const matchesCurrency =
      !selectedCurrency || bank.currency === selectedCurrency;
    const matchesStatus =
      !selectedStatus ||
      (selectedStatus === "active" ? bank.isActive : !bank.isActive);

    return matchesSearch && matchesCurrency && matchesStatus;
  });

  const totalBanks = data.length;
  const activeBanks = data.filter((b: any) => b.isActive).length;
  const currencyCount = new Set(data.map((b: any) => b.currency)).size;

  return (
    <Fragment>
      <div className="flex justify-between items-center p-2">
        <Typography.Title className="m-0" level={3}>
          Receiving Bank Management
        </Typography.Title>
        <Space>
          <Button icon={<FileUp size={16} />}>Export Data</Button>
          <Button
            icon={<Plus size={16} />}
            type="primary"
            onClick={handleCreateBank}
          >
            Add New Bank
          </Button>
        </Space>
      </div>
      <Layout.Content>
        {/* Statistics */}
        <Row className="mb-2" gutter={16}>
          <Col span={8}>
            <Card className="bg-white/50">
              <Statistic prefix="🏦" title="Total Banks" value={totalBanks} />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="bg-white/50">
              <Statistic
                prefix="✅"
                title="Active Banks"
                value={activeBanks}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="bg-white/50">
              <Statistic
                prefix="💱"
                title="Currency Types"
                value={currencyCount}
                valueStyle={{ color: "#1890ff" }}
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
                placeholder="Search bank, account, holder..."
                prefix={<Search size={16} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                allowClear
                placeholder="Filter by currency"
                style={{ width: "100%" }}
                value={selectedCurrency}
                onChange={setSelectedCurrency}
              >
                {currencyOptions.map((option) => (
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
                  setSelectedCurrency(undefined);
                  setSelectedStatus(undefined);
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Banks Table */}
        <Card>
          <ReceivingBankTable
            isLoading={isLoading || isRefetching || isLoadingDelete}
            banks={filteredBanks}
            currencyOptions={currencyOptions}
            onDelete={handleDeleteBank}
            onEdit={handleEditBank}
            onView={handleViewBankDetail}
          />
        </Card>

        {/* Bank Create/Edit Modal */}
        <ReceivingBankModal
          bankForm={bankForm}
          bankOptions={bankOptions}
          currencyOptions={currencyOptions}
          editingBank={editingBank}
          visible={isBankModalVisible}
          onCancel={() => setIsBankModalVisible(false)}
          onFinish={handleSubmitBank}
          isLoading={isLoadingCreate || isLoadingUpdate}
        />

        {/* Bank Detail Drawer */}
        <ReceivingBankDetailDrawer
          bank={selectedBank}
          currencyOptions={currencyOptions}
          visible={isBankDetailVisible}
          onClose={() => setIsBankDetailVisible(false)}
        />
      </Layout.Content>
    </Fragment>
  );
}
