import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Table, Typography } from "antd";
const { Title } = Typography;

const { Option } = Select;

interface Props {
  itemType: String;
}

function ModalCadastro(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { itemType } = props;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = (values: any) => {
    console.log(values);
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{
          margin: "10px",
          backgroundColor: "#FFF",
          color: "#001529",
          border: "1px solid #001529",
        }}
        onClick={showModal}
      >
        Cadastrar novo {itemType}
      </Button>
      <Modal
        title={`Cadastrar novo ${itemType}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[<></>]}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="itemName" label={`Nome do ${itemType}`}>
            <Input placeholder={`Digite o nome do ${itemType}`} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalCadastro;
