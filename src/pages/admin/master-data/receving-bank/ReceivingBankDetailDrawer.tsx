import { Divider, Drawer, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function ReceivingBankDetailDrawer({
  visible,
  bank,
  currencyOptions,
  onClose,
}: any) {
  return (
    <Drawer
      open={visible}
      placement="right"
      title="Bank Details"
      width={500}
      onClose={onClose}
    >
      {bank && (
        <div>
          <div className="mb-6">
            <Title level={4}>{bank.bankName}</Title>
            <Text className="text-lg font-semibold">{bank.bankCode}</Text>
            <div className="flex items-center space-x-2 mt-2">
              <Tag
                color={
                  currencyOptions.find((c: any) => c.value === bank.currency)
                    ?.color
                }
              >
                {bank.currency}
              </Tag>
              <Tag color={bank.isActive ? "green" : "red"}>
                {bank.isActive ? "Active" : "Inactive"}
              </Tag>
            </div>
          </div>

          <Divider>Account Info</Divider>
          <div className="mb-4">
            <Text strong>Account Number:</Text>
            <div className="text-lg font-mono">{bank.accountNumber}</div>
          </div>

          <div className="mb-4">
            <Text strong>Account Holder:</Text>
            <div>{bank.accountHolderName}</div>
          </div>

          <div className="mb-4">
            <Text strong>Branch:</Text>
            <div>{bank.branchName || "No info"}</div>
          </div>

          <div className="mb-4">
            <Text strong>Currency:</Text>
            <div>
              <Tag
                color={
                  currencyOptions.find((c: any) => c.value === bank.currency)
                    ?.color
                }
              >
                {bank.currency}
              </Tag>
            </div>
          </div>

          <Divider>System Info</Divider>
          <div className="mb-4">
            <Text strong>Created At:</Text>
            <div>{new Date(bank.createdAt).toLocaleString("en-US")}</div>
          </div>

          <div className="mb-4">
            <Text strong>Last Updated:</Text>
            <div>{new Date(bank.updatedAt).toLocaleString("en-US")}</div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
