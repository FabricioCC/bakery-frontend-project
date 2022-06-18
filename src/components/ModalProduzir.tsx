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
  ingredientsColumn: any;
}

function ModalProduzir(props: Props) {
  const { products, ingredients, ingredientsColumn } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [neededIngredients, setNeededIngredients] = useState<Ingredient[]>();
  const [showAlert, setShowAlert] = useState(false);
  const [form] = Form.useForm();

  const ingredientsReceipt = [
    [
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
    ],
    [
      {
        id: 3,
        name: "Massa de tapioca",
        amount: 1500,
      },
      {
        id: 4,
        name: "Coco",
        amount: 500,
      },
      {
        id: 5,
        name: "Queijo",
        amount: 1000,
      },
    ],
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
    setNeededIngredients(ingredientsReceipt[e]);
  };

  const verifyAmount = (e: any) => {
    console.log(e);
    // let neededAmount = 0;
    // neededIngredients?.map((item) => {
    //   neededAmount = item.amount * e;
    //   ingredients.map((ingredient) => {
    //     if (ingredient.id == item.id) {
    //       if (ingredient.amount >= neededAmount) {
    //         setShowAlert(true);
    //       } else {
    //         setShowAlert(false);
    //       }
    //     }
    //   });
    // });
  };
  return (
    <>
      <Button type="primary" style={{ margin: "10px" }} onClick={showModal}>
        Produzir
      </Button>
      <Modal
        title="Iniciando produção"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {showAlert && (
          <Alert message="Ingredientes insuficientes" type="error" />
        )}
        <Form layout="vertical" form={form}>
          <Form.Item label="Nome do produto">
            <Select onChange={selectProduct}>
              {products.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quantidade">
            <Input
              placeholder="Digite a quantidade"
              type="number"
              onChange={verifyAmount}
            />
          </Form.Item>
        </Form>
        <div>
          <Title level={4}>Lista de ingredientes necessários</Title>
          <Table
            dataSource={neededIngredients}
            columns={ingredientsColumn}
            style={{ minHeight: "80%" }}
            pagination={{ pageSize: 4 }}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalProduzir;
