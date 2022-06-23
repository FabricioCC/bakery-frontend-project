import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import api from "../services/api";

const { Option } = Select;

interface Ingredient {
  id: number;
  name: String;
  amount: number;
}
interface Props {
  ingredients: Ingredient[];
}

function ModalCompra(props: Props) {
  const { ingredients } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
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
    let date = new Date().getTime();
    const buyObject = {
      providerName: e.providerName,
      ingredientId: e.ingredientId,
      amount: parseInt(e.amount),
      timestamp: date,
    };
    console.log(buyObject);

    const response = await api.post("/buy", buyObject);
    console.log(response);
  };
  return (
    <>
      <Button danger style={{ margin: "10px" }} onClick={showModal}>
        Registrar compra
      </Button>
      <Modal
        title="Registre sua compra de insumos"
        visible={isModalVisible}
        footer={[<></>]}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item name="ingredientId" label="Nome do ingrediente">
            <Select>
              {ingredients.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Quantidade em gramas(g)">
            <Input placeholder="Digite a quantidade" type="number" />
          </Form.Item>
          <Form.Item name="providerName" label="Digite o nome do fornecedor">
            <Input placeholder="Digite o nome do fornecedor" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Realizar compra
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalCompra;
