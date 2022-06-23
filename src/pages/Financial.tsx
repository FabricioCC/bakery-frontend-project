import React, { useEffect, useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Typography, Table, Modal, Row, Card, Col, Statistic } from "antd";
import { useFetch } from "../hooks/useFetch";
import api from "../services/api";
const { Title } = Typography;

interface BuyDTO {
  amount: number;
  made_at: string;
  provider_name: string;
  name: string;
}

interface SellDTO {
  amount: number;
  made_at: string;
  name: string;
}

const vendas = [
  {
    name: "Pão",
    amount: 10,
    made_at: "20/05/2022",
  },
  {
    name: "Bolo",
    amount: 2,
    made_at: "20/05/2022",
  },
  {
    name: "Queijo",
    amount: 12,
    made_at: "20/05/2022",
  },
];

const salesColumns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Quantidade",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Horário",
    dataIndex: "made_at",
    key: "made_at",
  },
];

const purchases: BuyDTO[] = [];

const purchasesColumn = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Quantidade",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Fornecedor",
    dataIndex: "provider_name",
    key: "provider_name",
  },
  {
    title: "Horário",
    dataIndex: "made_at",
    key: "made_at",
  },
];

function Financial() {
  const [purchases, setPurchases] = useState<BuyDTO[]>([]);
  const [sales, setSales] = useState<SellDTO[]>([]);
  useEffect(() => {
    api.get("/buy/2022-06-23").then((response) => {
      const newResponse = [];
      response.data.map((item: BuyDTO) => {
        let time = new Date(item.made_at);
        item.made_at = `${time.getHours()}:${time.getMinutes()}`;
      });
      setPurchases(response.data);
    });
    api.get("/sell/2022-06-23").then((response) => {
      const newResponse = [];
      response.data.map((item: SellDTO) => {
        let time = new Date(item.made_at);
        item.made_at = `${time.getHours()}:${time.getMinutes()}`;
      });
      setSales(response.data);
    });
  }, []);

  return (
    <div
      className="site-layout-background"
      style={{
        marginTop: "30px",
        padding: "12px 24px",
        minHeight: 200,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          margin: "20px",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ width: "45%" }}>
          <Title level={4}>Relatório de vendas de hoje</Title>
          <Table
            dataSource={sales}
            columns={salesColumns}
            style={{ minHeight: "20vh" }}
            pagination={{ pageSize: 3 }}
          />
        </div>
        <div style={{ width: "45%" }}>
          <Title level={4}>Relatório de compras</Title>
          <Table
            dataSource={purchases}
            columns={purchasesColumn}
            style={{ minHeight: "20vh" }}
            pagination={{ pageSize: 3 }}
          />
        </div>
      </div>
      <div
        style={{
          margin: "30px 20px",
          padding: "30px",
          background: "#ececec",
          width: "30%",
          position: "relative",
          left: "35%",
        }}
      >
        <Title level={3}>Visão geral do dia anterior</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Vendas (Unidades)"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Desperdício (Unidades)"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "10px" }}>
          <Col style={{ width: "100%" }}>
            <Card>
              <Title level={4}>Saldo: </Title>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Financial;
