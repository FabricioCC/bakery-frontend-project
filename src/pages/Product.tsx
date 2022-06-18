import React, { useState } from "react";
import { Typography, List, Button, Table, Modal } from "antd";
import ModalProduzir from "../components/ModalProduzir";
import ModalVenda from "../components/ModalVenda";
import ModalCadastro from "../components/ModalCadastro";
const { Title } = Typography;

function Product() {
  const products = [
    {
      id: 0,
      name: "Pão francês",
    },
    {
      id: 1,
      name: "Pão doce",
    },
    {
      id: 2,
      name: "Bolo",
    },
    {
      id: 3,
      name: "Pão carteira",
    },
  ];

  const productColumn = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
  ];

  const dailyProducts = [
    {
      name: "pao_frances",
      amount: 10,
      date: "2022-06-13",
      made_at: "07:00:00",
    },
    {
      name: "pao_doce",
      amount: 22,
      date: "2022-06-13",
      made_at: "09:00:00",
    },
  ];

  const dailyColumns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantidade (unidade)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Horário da produção",
      dataIndex: "made_at",
      key: "made_at",
    },
  ];

  const ingredients = [
    {
      id: 0,
      name: "Farinha",
      amount: 1500,
    },
    {
      id: 1,
      name: "Manteira",
      amount: 500,
    },
    {
      id: 2,
      name: "Açúcar",
      amount: 1000,
    },
  ];

  const ingredientColumns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantidade (g)",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  return (
    <div
      className="site-layout-background"
      style={{
        marginTop: "30px",
        padding: "12px 24px",
        minHeight: 500,
      }}
    >
      <div
        style={{
          position: "relative",
          top: "0%",
          left: "45%",
          width: "50%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <ModalCadastro itemType="ingrediente" />
        <ModalCadastro itemType="produto" />
        <ModalProduzir
          products={products}
          ingredients={ingredients}
          ingredientsColumn={ingredientColumns}
        />
        <ModalVenda products={products} />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%" }}>
          <Title level={4}>Produção diária </Title>
          <Table
            dataSource={dailyProducts}
            columns={dailyColumns}
            style={{ minHeight: "80%" }}
            pagination={{ pageSize: 4 }}
          />
        </div>
        <div style={{ width: "30%", marginLeft: "50px" }}>
          <Title level={4}>Lista de ingredientes</Title>
          <Table
            dataSource={ingredients}
            columns={ingredientColumns}
            style={{ minHeight: "80%" }}
            pagination={{ pageSize: 4 }}
          />
        </div>
        <div style={{ width: "30%", marginLeft: "50px" }}>
          <Title level={4}>Previsões para hoje</Title>
          <Table
            dataSource={products}
            columns={productColumn}
            pagination={{ pageSize: 4 }}
          />
          ;
        </div>
      </div>
    </div>
  );
}

export default Product;
