import { FormEvent, useEffect, useState } from "react";
import FormCard from "../components/formCard";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";
import ErrorMessage from "../components/errorMessage";
import { authenticatePermission } from "../services/authentication";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!login || !password) return setError({message: 'Preencha todos os campos.'});

    try {
      const {access_token} = await authenticatePermission(login, password);
      localStorage.setItem('accessToken', access_token);
      navigate('/payables/new');
    } catch (error) {
      setError(error)
    }
  };

  useEffect(() => {
    setError(null);
  }, [login, password])

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

        <ErrorMessage error={error}/>

        <form 
          onSubmit={(e) => handleLogin(e)}
          className="flex flex-col gap-3"
        >
          <Input
            type="text"
            placeholder="Login"
            value={login}
            setValue={setLogin}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />

          <Button type="submit">Entrar</Button>
        </form>
      </FormCard>
    </main>
  )
}