import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  HomeOutlined,
  ShopOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "/",
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      label: "Category",
      children: [
        {
          key: "3",
          icon: <HomeOutlined />,
          label: "All",
          link: "/all-category",
        },
        {
          key: "4",
          icon: <AppstoreAddOutlined />,
          label: "Add",
          link: "/add-category",
        },
      ],
    },
    {
      key: "5",
      icon: <ShopOutlined />,
      label: "Product",
      children: [
        {
          key: "6",
          icon: <HomeOutlined />,
          label: "All",
          link: "/all-product",
        },
        {
          key: "7",
          icon: <AppstoreAddOutlined />,
          label: "Add",
          link: "/add-product",
        },
      ],
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-[100vh]">
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          className="pt-6"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key} icon={child.icon}>
                    <Link to={child.link}>{child.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="overflow-auto"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
