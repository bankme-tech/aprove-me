import type { FormProps } from "antd";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type FieldType = {
  id: string;
  value: number;
  emissionDate: string;
  assignor: string;
};

const CreatePayable = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    navigate("/payable", {
      state: {
        payable: {
          ...values,
          emissionDate: dayjs(values.emissionDate).toISOString(),
        },
      },
    });
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto py-8 gap-4 w-full">
      <h1 className="text-2xl">Cadastro de pagavel</h1>
      <Form
        name="basic"
        onFinish={onFinish}
        initialValues={{
          id: "6755767e-c5ef-4cd7-8e5b-67ce7b230131",
          value: 0,
          emissionDate: dayjs("01/01/2001 01:11", "DD/MM/YYYY HH:mm"),
          assignor: "6755767e-c5ef-4cd7-8e5b-67ce7b230131",
        }}
        autoComplete="off"
        layout="vertical"
        className="flex flex-col w-full max-w-sm gap-4"
      >
        <Form.Item<FieldType>
          label="ID"
          name="id"
          rules={[
            { required: true, message: "O campo é obrigatório!" },
            {
              pattern:
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
              message: "O ID deve ser um UUID válido!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Valor"
          name="value"
          rules={[{ required: true, message: "O campo é obrigatório!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<FieldType>
          label="Data de emissão"
          name="emissionDate"
          rules={[{ required: true, message: "O campo é obrigatório!" }]}
        >
          <DatePicker
            className="w-full"
            placeholder="Selecione a data"
            showTime
            format={"DD/MM/YYYY HH:mm"}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="ID do cedente"
          name="assignor"
          rules={[
            { required: true, message: "O campo é obrigatório!" },
            {
              pattern:
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
              message: "O ID deve ser um UUID válido!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePayable;
