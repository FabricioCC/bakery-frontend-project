import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Table, Typography } from "antd";
const { Title } = Typography;

const { Option } = Select;

interface Product {
  id: number;
  name: String;
}

interface Props {
  products: Product[];
}

function ModalVenda(props: Props) {
  const { products } = props;

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
  return (
    <>
      <Button danger style={{ margin: "10px" }} onClick={showModal}>
        Registrar venda
      </Button>
      <Modal
        title="Registre sua venda"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Nome do produto">
            <Select>
              {products.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quantidade em unidades">
            <Input placeholder="Digite a quantidade" type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalVenda;
