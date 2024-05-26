import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { Assignor } from "../../model/assignor";
import assignorService from "../../services/assignorService";
import { isAxiosError } from "axios";

interface FieldType extends Assignor {}
const CreateAssignor = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: Assignor
  ) => {
    try {
      await assignorService.create({
        ...values,
      });
      toast.success("Cedente cadastrado com sucesso!");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error("Cedente com o id informado já existe");
          return;
        }

        if (error.response?.status === 400) {
          toast.error("Dados inválidos");
          return;
        }
      }

      toast.error("Erro ao cadastrar pagável");
    }
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto py-8 gap-4 w-full">
      <h1 className="text-2xl">Cadastro de pagavel</h1>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={() =>
          toast.error(
            "Erro ao cadastrar cedente, verifique os campos e tente novamente!"
          )
        }
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
          label="Nome"
          name="name"
          rules={[
            { required: true, message: "O campo é obrigatório!" },
            {
              max: 140,
              message: "O campo deve ter no máximo 140 caracteres!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Documento"
          name="document"
          rules={[
            { required: true, message: "O campo é obrigatório!" },
            {
              max: 30,
              message: "O campo deve ter no máximo 30 caracteres!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "O campo é obrigatório!" },
            {
              max: 140,
              message: "O campo deve ter no máximo 140 caracteres!",
            },
            {
              type: "email",
              message: "O campo deve ser um email válido!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Telefone"
          name="phone"
          rules={[
            { required: true, message: "O campo é obrigatório!" },
            {
              max: 20,
              message: "O campo deve ter no máximo 20 caracteres!",
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

export default CreateAssignor;
