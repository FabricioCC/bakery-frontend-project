import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  List,
  Modal,
  Select,
  Table,
  Typography,
} from "antd";
import api from "../services/api";
const { Title } = Typography;

const { Option } = Select;

interface Props {
  itemType: String;
  ingredients: Ingredient[];
}

interface Ingredient {
  id: number;
  name: string;
  amount: number;
}

interface IngredientP {
  ingredientId: number;
  name: String;
  amount: number;
}

interface IngredientRequest {
  ingredientId: number;
  amount: number;
}

function ModalCadastro(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productIngredients, setProductIngredients] = useState<IngredientP[]>(
    []
  );

  const [ingredientId, setIngredientId] = useState<number>(0);
  const [ingredientAmount, setIngredientAmount] = useState<string>("");

  const [form] = Form.useForm();
  const { itemType, ingredients } = props;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = async (values: any) => {
    let newProducts: IngredientRequest[] = [];
    productIngredients.forEach((item) => {
      newProducts.push({
        ingredientId: item.ingredientId,
        amount: item.amount,
      });
    });
    if (itemType === "produto") {
      const productObject = {
        name: values.itemName,
        ingredients: newProducts,
      };
      console.log(productObject);
      const response = await api.post("/product", productObject);
      console.log(response);
    } else {
      let newIngredient = {
        name: values.itemName,
        amount: 0,
      };

      const response = await api.post("/ingredient", newIngredient);
      console.log(response);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleIngredientSubmit = (e: any) => {
    let value = ingredients.find((item) => item.id === ingredientId);
    let ingredientName = "";
    if (value) {
      ingredientName = value.name;
    }
    const newIngredient = {
      ingredientId: ingredientId,
      name: ingredientName,
      amount: parseInt(ingredientAmount),
    };
    setProductIngredients([...productIngredients, newIngredient]);
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
          {itemType === "produto" && (
            <>
              <Form>
                <span>Ingredientes: </span>

                <div style={{ display: "flex" }}>
                  <Select
                    style={{ width: "70%" }}
                    onChange={(e: any) => {
                      setIngredientId(e);
                    }}
                  >
                    {ingredients.map((item) => (
                      <Option value={item.id}>{item.name}</Option>
                    ))}
                  </Select>

                  <Input
                    type="number"
                    onChange={(e) => setIngredientAmount(e.target.value)}
                    placeholder="amount"
                    style={{ width: "30%" }}
                  />
                </div>

                <Button
                  onClick={handleIngredientSubmit}
                  style={{ marginBottom: "20px" }}
                >
                  Add
                </Button>
              </Form>

              <List
                bordered
                dataSource={productIngredients}
                renderItem={(item) => (
                  <List.Item>
                    {item.name} - {item.amount}g
                  </List.Item>
                )}
              />
            </>
          )}

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
