import { useEffect, useState } from "react";
import { axiosInstance as axios} from "../../api";
import { useNavigate } from "react-router-dom";
import { Assignor } from "../../types";
import { getTokenAndSetHeaders } from "../../helpers";

function CreatePayable() {
  const [assignors, setAssignors] = useState<Assignor[]>([]);
  const [formData, setFormData] = useState({ assignor: '', value: 0 });
  const navigate = useNavigate();  

  const config = getTokenAndSetHeaders();
  
  useEffect(() => {
    const getAssignors = async () => {
      try {
        const { data } = await axios.get('/assignor', config);
        setAssignors(data);
      } catch (err) {
        alert('Você não está logado.');
      }
    };
    
    getAssignors();
  }, [config]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const assignor = assignors.find(({ name }) => name === formData.assignor);
    const payload = {
      assignor: assignor?.id,
      value: formData.value !== 0 ? formData.value : undefined,
    };

    try {
      const { data: { id } } = await axios.post('/payable', payload, config);
      alert('Novo recebível cadastrado com sucesso.');
      navigate(`/payable/${id}`);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;    
    setFormData({...formData, [name]: value});
  }

  return (
    <main>
      <h1>Cadastro de Recebíveis</h1>
      <form action="submit" onSubmit={ handleSubmit }>
        <label htmlFor="assignor-select">
          Cedente:
          <select
            name="assignor"
            id="assignor-select"
            value={ formData.assignor }
            onChange={ handleChange }
          >
            <option value="" disabled selected>Selecione o cedente</option>
            {assignors.map(({ name }, index) => {
              return (
                <option
                  key={ index } value={ name }>{ name }</option>
              )
            })}
          </select>
        </label>
        <label htmlFor="payable-value-input">
            Valor:
          <input
            type="number"
            placeholder="Valor a receber"
            name="value"
            id="payable-value-input"
            value={ formData.value }
            onChange={ handleChange }
          />
        </label>
        <button>Cadastrar</button>
      </form>
    </main>
  )
}

export default CreatePayable;
