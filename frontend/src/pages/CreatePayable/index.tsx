import type { FormProps } from "antd";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import payableService from "../../services/payableService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Assignor } from "../../model/assignor";
import assignorService from "../../services/assignorService";
import { isAxiosError } from "axios";

type FieldType = {
  id: string;
  value: number;
  emissionDate: string;
  assignor: string;
};

const CreatePayable = () => {
  const navigate = useNavigate();
  const [assignors, setAssignors] = useState<Assignor[]>([]);

  useEffect(() => {
    const fetchAssignors = async () => {
      const response = await assignorService.findAll();
      setAssignors(response.data);
    };

    try {
      fetchAssignors();
    } catch (error) {
      toast.error("Erro ao buscar cedentes");
    }
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await payableService.createPayable({
        ...values,
        emissionDate: dayjs(values.emissionDate).toISOString(),
      });
      navigate("/payable", {
        state: {
          payable: {
            ...values,
            emissionDate: dayjs(values.emissionDate).toISOString(),
          },
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error("Pagável com o id informado já existe");
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
          rules={[{ required: true, message: "O campo é obrigatório!" }]}
        >
          <Select
            allowClear
            showSearch
            filterOption={(input, option) =>
              (String(option?.label) ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={assignors.map((assignor) => ({
              label: assignor.name,
              value: assignor.id,
            }))}
          />
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
