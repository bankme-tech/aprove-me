import { useState } from "react";
import { axiosInstance as axios } from "../api";

const initialState = {
  login: '',
  password: '',
};

function Login() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {      
      const { data } = await axios.post('/auth', formData);
      alert(data.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return(
    <main>
      <h1>Efetue o Login</h1>
      <form action="submit" onSubmit={ handleSubmit }>
        <input
          type="text"
          name="login"
          placeholder="Usuário"
          value={ formData.login }
          onChange={ handleChange }
        />
        <input
          type="text"
          name= 'password'
          placeholder="Senha"
          value={ formData.password }
          onChange={ handleChange }
        />
        <button>Entrar</button>
      </form>
    </main>
  );
}

export default Login;