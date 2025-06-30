import type { MenuProps } from "antd";

import {
  CodeOutlined,
  DashboardOutlined,
  DatabaseFilled,
  EnvironmentOutlined,
  FileOutlined,
  SettingOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React, { useState } from "react";

import { getBreadcrumbItems } from "@/lib/utils";
import { usePathname, useRouter } from "@/routes/hooks";
import { ADMIN_ROUTES } from "@/routes/routes";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem("Dashboard", ADMIN_ROUTES.DASHBOARD, <DashboardOutlined />),
  getItem(
    "Location Manager",
    ADMIN_ROUTES.LOCATION_MANAGER,
    <EnvironmentOutlined />,
  ),
  getItem("Blog Manager", ADMIN_ROUTES.BLOG_MANAGER, <FileOutlined />),
  getItem("User Manager", "users", <UserOutlined />, [
    getItem("User List", ADMIN_ROUTES.USER_LIST),
    getItem("User Post", ADMIN_ROUTES.USER_POST),
  ]),
  getItem("Master data", "data", <DatabaseFilled />, [
    getItem("Pricing Plan", ADMIN_ROUTES.PRICING_PLAN),
    getItem("Receiving Bank", ADMIN_ROUTES.RECEIVING_BANK_ACCOUNT),
    getItem("Plan Question", ADMIN_ROUTES.PLAN_QUESTION),
  ]),
  getItem(
    "Transactions",
    ADMIN_ROUTES.TRANSACTION_LIST,
    <TransactionOutlined />,
  ),

  getItem("System Logs", "logs", <CodeOutlined />, [
    getItem("Build Logs", ADMIN_ROUTES.BUILD_LOGS),
    getItem("Error Logs", ADMIN_ROUTES.ERROR_LOGS),
  ]),

  getItem("Settings", ADMIN_ROUTES.SETTING, <SettingOutlined />),
];

const DefaultAdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Find the selected key based on pathname
  const findSelectedKey = (items: MenuItem[]): string[] => {
    for (const item of items) {
      if (item?.key === pathname) return [item.key as string];
      if (item && "children" in item && Array.isArray(item.children)) {
        const child = findSelectedKey(item.children as MenuItem[]);

        if (child.length) return [item.key as string, ...child];
      }
    }

    return [];
  };

  const selectedKeys = findSelectedKey(menuItems);

  const onMenuClick: MenuProps["onClick"] = (e) => {
    // Only navigate if the key is a route
    if (typeof e.key === "string" && e.key.startsWith("/")) {
      router.push(e.key);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        theme="dark"
        onCollapse={setCollapsed}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          HODOS Admin
        </div>
        <Menu
          defaultOpenKeys={selectedKeys}
          items={menuItems}
          mode="inline"
          selectedKeys={selectedKeys}
          theme="dark"
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Content>
          <div
            style={{
              padding: 20,
              height: "calc(100vh - 10px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "auto",
            }}
          >
            <Breadcrumb
              items={getBreadcrumbItems(pathname)}
              style={{ margin: "10px 0" }}
            />
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultAdminLayout;
