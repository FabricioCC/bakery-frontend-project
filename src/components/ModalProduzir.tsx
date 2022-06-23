import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Typography,
  Alert,
} from "antd";
import { AnyMxRecord } from "dns";
import api from "../services/api";
const { Title } = Typography;
const { Option } = Select;

interface Product {
  id: number;
  name: String;
}

interface Ingredient {
  id: number;
  name: String;
  amount: number;
}

interface Props {
  products: Product[];
  ingredients: Ingredient[];
}

interface ReceiptItem {
  id: number;
  name: string;
  amount: number;
}

function ModalProduzir(props: Props) {
  const { products, ingredients } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [neededIngredients, setNeededIngredients] = useState<Ingredient[]>();
  const [showAlert, setShowAlert] = useState(false);
  const [form] = Form.useForm();

  const [receipt, setReceipt] = useState<ReceiptItem[]>([]);
  const [qtMax, setQtMax] = useState(0);

  const getReceipt = (productId: number) => {
    api.get(`product/${productId}/ingredients`).then((response) => {
      setReceipt(response.data);
      setMaxProducts(response.data);
    });
  };

  const receiptColumn = [
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectProduct = (e: number) => {
    getReceipt(e);
  };

  const setMaxProducts = (receipt: ReceiptItem[]) => {
    let isValid = true;
    let max = 0;
    while (isValid) {
      max = max + 1;
      receipt.map((item) => {
        ingredients.map((ingredient) => {
          if (ingredient.id === item.id) {
            console.log(item.amount * max);
            if (!(item.amount * max <= ingredient.amount)) {
              isValid = false;
              return;
            }
          }
        });
      });
    }

    max = max - 1;
    setQtMax(max);
  };

  const onFinish = async (e: any) => {
    let date = new Date();

    const object = {
      productId: parseInt(e.id),
      amount: parseInt(e.amount),
      timestamp: date,
    };

    const response = await api.post("/daily", object);
    console.log(response);
  };

  return (
    <>
      <Button type="primary" style={{ margin: "10px" }} onClick={showModal}>
        Produzir
      </Button>
      <Modal
        title="Iniciando produção"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[<></>]}
      >
        {showAlert && (
          <Alert message="Ingredientes insuficientes" type="error" />
        )}
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="id" label="Nome do produto">
            <Select onChange={selectProduct}>
              {products.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Quantidade">
            <Input
              max={qtMax}
              placeholder="Digite a quantidade"
              type="number"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Produzir
            </Button>
          </Form.Item>
        </Form>
        <div>
          <Title level={4}>Lista de ingredientes necessários</Title>
          <Table
            dataSource={receipt}
            columns={receiptColumn}
            style={{ minHeight: "80%" }}
            pagination={{ pageSize: 4 }}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalProduzir;
