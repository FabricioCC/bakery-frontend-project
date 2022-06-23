import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Table, Typography } from "antd";
import api from "../services/api";
const { Title } = Typography;

const { Option } = Select;

interface Product {
  id: number;
  name: String;
  amount: number;
}

interface Props {
  products: Product[];
}

function ModalVenda(props: Props) {
  const { products } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [product, setProduct] = useState(0);
  const [max, setMax] = useState(0);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = async (e: any) => {
    let date = new Date();

    const object = {
      productId: product,
      amount: parseInt(e.amount),
      timestamp: date,
    };

    const response = await api.post("/sell", object);
    console.log(response);
  };

  const calculateMax = (e: number) => {
    products.map((item) => {
      if (item.id === e) {
        setMax(item.amount);
      }
    });

    setProduct(e);
  };
  return (
    <>
      <Button danger style={{ margin: "10px" }} onClick={showModal}>
        Registrar venda
      </Button>
      <Modal
        title="Registre sua venda"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[<></>]}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item name="productId" label="Nome do produto">
            <Select onChange={(e: number) => calculateMax(e)}>
              {products.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Quantidade em unidades">
            <Input max={max} placeholder="Digite a quantidade" type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Realizar venda
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalVenda;
