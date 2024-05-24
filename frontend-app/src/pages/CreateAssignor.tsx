import { useState } from "react";
import { axiosInstance as axios } from '../api';

const initialState = {
  name: '',
  document: '',
  email: '',
  phone: '',
}

function CreateAssignor() {
  const [formData, setFormData] = useState(initialState);
  let message;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  };

  const createAssignor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      const response = await axios.post('/assignor', formData, config);
      setFormData(initialState);
      console.log(response.data);
      message = "Cadastrado com sucesso."
    } catch (err) {
      message = "Algo deu errado."
      console.log(err);
    }
  }
  
  return (
    <main>
      <h1>Cadastro de Cedentes</h1>
        <form action="submit" onSubmit={ createAssignor }>
          <input
            type="text"
            placeholder="Nome do cedente"
            name="name"
            value={ formData.name }
            onChange={handleChange}
            />
          <input
            type="text"
            placeholder="Número do documento"
            name="document"
            value={ formData.document }
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={ formData.email }
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={ formData.phone }
            onChange={handleChange}
          />
          <button>Cadastrar</button>
        </form>
        <p>{message}</p>
    </main>
  )
}

export default CreateAssignor;