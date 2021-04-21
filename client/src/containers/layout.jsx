import { Layout, Menu, Breadcrumb, Avatar, Divider, Tooltip } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import React from "react";
import "antd/dist/antd.css";
import "./layout.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const User = () => {
  return (
    <>
      <Avatar size={40} style={{ color: "#fff", backgroundColor: "#87d068" }}>
        UU
      </Avatar>
    </>
  );
};

const layout = () => {
  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Layout>
        <div>logo</div>
        <Header>header</Header>
      </Layout>
      <Layout>
        <Sider>sider</Sider>
        <Content>content</Content>
      </Layout>
    </Layout>
  );
};

export default layout;
