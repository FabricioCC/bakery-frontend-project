import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import RoutesControl from "./routes";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const App = () => (
  <Layout className="layout">
    <Header>
      <a href="/">
        <div className="logo" />
      </a>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["4"]}
        items={[
          { name: "Produção", key: "product" },
          { name: "Relatórios financeiros", key: "financial" },
        ].map((item, index) => ({
          key: `${item.key}`,
          label: `${item.name}`,
        }))}
        onClick={(e) => {
          window.location.href = `/${e.key}`;
        }}
      />
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <RoutesControl />
    </Content>
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Projeto para disciplina de banco de dados
    </Footer>
  </Layout>
);

export default App;
