import React, { useEffect, useState } from "react";
import { Typography, List, Button, Table, Modal } from "antd";
import ModalProduzir from "../components/ModalProduzir";
import ModalVenda from "../components/ModalVenda";
import ModalCadastro from "../components/ModalCadastro";
import api from "../services/api";
import { useFetch } from "../hooks/useFetch";
import ModalCompra from "../components/ModalCompra";
const { Title } = Typography;

interface Ingredient {
  id: number;
  name: string;
  amount: number;
}

interface Product {
  id: number;
  name: string;
  amount: number;
}

interface Daily {
  productId: number;
  amount: number;
  time: string;
  id: number;
  name?: string;
}

function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [dailyProducts, setDailyProducts] = useState<Daily[]>([]);
  useEffect(() => {
    api.get("/product").then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("/daily/2022-06-23").then((response) => {
      let dailys = response.data;

      dailys.map((item: Daily) => {
        let product = products.find((product) => product.id === item.id);
        if (product && product.name) {
          item.name = product.name;
        }
        let time = new Date(item.time);
        item.time = `${time.getHours()}:${time.getMinutes()}`;
      });
      console.log(dailys);
      setDailyProducts(response.data);
    });
  }, products);

  const productColumn = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantidade(unidades)",
      dataIndex: "amount",
      key: "amount",
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
      dataIndex: "time",
      key: "time",
    },
  ];

  const { data } = useFetch<Ingredient[]>("/ingredient");
  const ingredients: Ingredient[] = data ? data : [];

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
        <ModalCompra ingredients={ingredients} />
        <ModalCadastro itemType="ingrediente" ingredients={ingredients} />
        <ModalCadastro itemType="produto" ingredients={ingredients} />
        <ModalProduzir products={products} ingredients={ingredients} />
        <ModalVenda products={products} />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "20%" }}>
          <Title level={4}>Produtos em estoque </Title>
          <Table
            dataSource={products}
            columns={productColumn}
            style={{ minHeight: "80%", marginRight: "40px" }}
            pagination={{ pageSize: 4 }}
          />
        </div>
        <div style={{ width: "20%" }}>
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
