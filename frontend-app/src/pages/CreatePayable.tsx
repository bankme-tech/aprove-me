import { useEffect, useState } from "react";
import { axiosInstance as axios} from "../api";

type Assignor = {
  id: string,
  name: string,
}

const initialState = {
  assignor: '',
  value: 0,
}

function CreatePayable() {
  const [assignors, setAssignors] = useState<Assignor[]>([]);
  const [formData, setFormData] = useState(initialState);

  const token = localStorage.getItem('token');
  const config = { headers: { 'Authorization': token } };

  useEffect(() => {
    const getAssignors = async () => {
      try {
        const { data } = await axios.get('/assignor', config);
        setAssignors(data);
      } catch (err) {
        alert('Você não está logado.')
        console.log(err);
      }
    }
    
    getAssignors()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAssignors])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = assignors.find(({ name }) => name === formData.assignor) as Assignor;

    const payload = { assignor: id, value: +formData.value };

    try {
      await axios.post('/payable', payload, config);
      alert('Novo recebível cadastrado com sucesso.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  return (
    <main>
      <h1>Cadastro de Recebíveis</h1>
      <form action="submit" onSubmit={ handleSubmit }>
        <label htmlFor="assignor">
          Cedente:
          <select
            name="assignor"
            id="assignor-select"
            value={ formData.assignor }
            onChange={ handleChange }
          >
            {assignors.map(({name}, index) => {
              return (
                <option
                  key={ index } value={ name }>{ name }</option>
              )
            })}
          </select>
        </label>
        <input
          type="number"
          placeholder="Valor a receber"
          name="value"
          id="payable-value-input"
          value={ formData.value }
          onChange={ handleChange }
        />
        <button>Cadastrar</button>
      </form>
    </main>
  )
}

export default CreatePayable;
