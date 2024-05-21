import FormCard from "../components/formCard";
import Title from "../components/title";
import Button from "../components/button";
import ErrorMessage from "../components/errorMessage";
import { authenticatePermission } from "../services/authentication";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1)
})

type LoginSchema = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const handleLogin: SubmitHandler<LoginSchema> = async (data) => {
    const { login, password } = data;

    try {
      const { access_token } = await authenticatePermission(login, password);
      localStorage.setItem('accessToken', access_token);
      navigate('/payables/new');
    } catch (error: any) {
      setError("root", { message: error.message as string })
    }
  };

  const onError = () => {
    setError("root", { message: 'Preencha todos os campos!' })
  }

  return (
    <main className="font-Nunito bg-themeColor w-full h-screen flex justify-center items-center">
      <FormCard>
        <div className="flex flex-col gap-3 items-center">
          <img
            src={process.env.PUBLIC_URL + '/logo-bankme.png'}
            alt="Logo bankme"
            className="w-16 h-auto"
          />
          <Title>Bem vindo!</Title>
        </div>

        <ErrorMessage error={errors.root} />

        <form
          onSubmit={handleSubmit(handleLogin, onError)}
          className="flex flex-col gap-3"
        >
          <Input
            placeholder="Login"
            register={register('login')}
          />

          <Input
            placeholder="Senha"
            type="password"
            register={register('password')}
          />

          <Button type="submit">Entrar</Button>
        </form>
      </FormCard>
    </main>
  )
}