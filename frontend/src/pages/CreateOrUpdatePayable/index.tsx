import type { FormProps } from "antd";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import payableService from "../../services/payableService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Assignor } from "../../model/assignor";
import assignorService from "../../services/assignorService";
import { isAxiosError } from "axios";

interface FieldType {
  emissionDate: dayjs.ConfigType;
  value: number;
  id: string;
  assignor: string;
}

const CreateOrUpdatePayable = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FieldType>();
  const [assignors, setAssignors] = useState<Assignor[]>([]);
  const params = useParams();

  const isEditing = !!params.id;

  useEffect(() => {
    const fetchAssignors = async () => {
      const response = await assignorService.findAll();
      setAssignors(response.data);
    };

    const fetchPayable = async () => {
      try {
        const response = await payableService.findById(params.id!);
        const payable = response.data;
        form.setFieldsValue({
          ...payable,
          emissionDate: dayjs(payable.emissionDate),
        });
      } catch (error) {
        toast.error("Erro ao buscar pagável");
      }
    };

    if (isEditing) {
      try {
        fetchPayable();
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            toast.error("Pagável não encontrado");
            navigate("/");
            return;
          }
        }

        toast.error("Erro ao buscar pagável");
      }
    }

    try {
      fetchAssignors();
    } catch (error) {
      toast.error("Erro ao buscar cedentes");
    }
  }, [isEditing]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (isEditing) {
      try {
        await payableService.update(params.id!, {
          emissionDate: dayjs(values.emissionDate).toISOString(),
          assignor: values.assignor,
          value: values.value,
        });
        navigate(`/payable/${params.id}`);

        toast.success("Pagável atualizado com sucesso");
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

        toast.error("Erro ao atualizar pagável");
      }
      return;
    }

    try {
      await payableService.createPayable({
        ...values,
        emissionDate: dayjs(values.emissionDate).toISOString(),
      });
      navigate(`/payable/${values.id}`);
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
      <h1 className="text-2xl">
        {isEditing ? "Edição" : "Cadastro"} de pagável
      </h1>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={() =>
          toast.error(
            `Erro ao ${
              isEditing ? "editar" : "cadastrar"
            } cedente, verifique os campos e tente novamente!`
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
            {isEditing ? "Atualizar" : "Cadastrar"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateOrUpdatePayable;
