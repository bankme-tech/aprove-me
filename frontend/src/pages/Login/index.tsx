import { Navigate, useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import authService from "../../services/authService";
import { toast } from "react-toastify";

type FieldType = {
  login?: string;
  password?: string;
};

const Login = () => {
  const isLogged = !!localStorage.getItem("token");
  const navigate = useNavigate();

  if (isLogged) return <Navigate to="/" />;

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const { data } = await authService.signIn({
        login: values.login!,
        password: values.password!,
      });

      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      toast.error("Usuário ou senha inválidos!");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    toast.error("Por favor, preencha os campos corretamente!");
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 mb-16 gap-4">
      <h1 className="text-2xl font-semibold text-center"> Entrar</h1>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Usuário"
          name="login"
          rules={[
            { required: true, message: "Por favor, insira seu usuário!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
