import React, { useState } from "react";
import {
  CalendarOutlined,
  CarryOutOutlined,
  FilterOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  OrderedListOutlined,
  SelectOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { SiderCalendar } from "./components/Calendar";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../routes/consts";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

interface IProps {
  children: React.ReactNode;
}

const SIDEBAR_ITEM: ItemType<MenuItemType>[] = [
  {
    key: ROUTES.BOOKING.index,
    icon: <CalendarOutlined />,
    label: "Bookings",
    children: [
      {
        key: ROUTES.BOOKING.CALENDAR,
        label: "Calendar View",
        icon: <CarryOutOutlined />,
      },
      {
        key: ROUTES.BOOKING.LIST,
        label: "Booking List",
        icon: <OrderedListOutlined />,
      },
      {
        key: ROUTES.BOOKING.FILTER,
        label: "Filter View",
        icon: <FilterOutlined />,
      },
    ],
  },
  {
    key: "2",
    icon: <TeamOutlined />,
    label: "Clients",
    children: [
      {
        key: "2-1",
        label: "Clients List",
      },
      {
        key: "2-2",
        label: "Client Categories",
      },
    ],
  },
  {
    key: "3",
    icon: <SelectOutlined />,
    label: "Inventory",
    children: [
      {
        key: "3-1",
        label: "Inventory List",
      },
      {
        key: "3-2",
        label: "Food-Catering",
      },
      {
        key: "3-3",
        label: "Water sports",
      },
      {
        key: "3-4",
        label: "Entertainment",
      },
    ],
  },
  {
    key: "4",
    icon: <TeamOutlined />,
    label: "Users",
    children: [
      {
        key: "4-1",
        label: "User Management",
      },
      {
        key: "4-2",
        label: "Role List",
      },
    ],
  },
  {
    key: "5",
    icon: <TeamOutlined />,
    label: "Partners",
    children: [
      {
        key: "5-1",
        label: "Partners List",
      },
      {
        key: "5-2",
        label: "Categories",
      },
    ],
  },
  {
    key: "6",
    icon: <NotificationOutlined />,
    label: "Promotions",
  },
  {
    key: "7",
    icon: <ToolOutlined />,
    label: "Settings",
  },
];

const siderStyle: React.CSSProperties = {
  height: "100dvh",
  overflow: "hidden",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
};

export const MainLayout: React.FC<IProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="app--layout">
      <Sider
        className="app--layout__sidebar"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        style={siderStyle}
      >
        <div className="app--layout__sidebar__logo">
          <img src="/SmartTourist-logo.webp" alt="logo" />
        </div>
        {!collapsed && <SiderCalendar />}
        <Menu
          mode="inline"
          items={SIDEBAR_ITEM}
          defaultOpenKeys={[`/${pathname.split("/")[1]}`]}
          selectedKeys={[pathname]}
          style={{
            height: "55dvh",
            overflowY: "auto",
          }}
          onClick={(item) => navigate(item.key)}
        />
      </Sider>
      <Layout className="app--layout__inner">
        <Header className="app--layout__inner__header">
          <Button
            type="text"
            size="large"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "Logout",
                  onClick: logout,
                  icon: <LogoutOutlined />,
                },
              ],
            }}
          >
            <div className="app--layout__inner__header__user-dropdown">
              <div>
                <p>{user?.role.name}</p>
                <h3>{user?.fullname}</h3>
              </div>
              <Avatar
                size="large"
                icon={<UserOutlined />}
                src="/images/captain-avatar.webp"
                style={{ marginRight: 10 }}
              />
            </div>
          </Dropdown>
        </Header>
        <Content className="app--layout__inner__content">{children}</Content>
      </Layout>
    </Layout>
  );
};
