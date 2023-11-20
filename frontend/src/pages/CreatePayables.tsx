import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/payable-table.css';

const PAYABLES_URL = 'localhost:3000/integrations/payable';
const ASSIGNOR_URL = 'localhost:3000/integrations/assignor';

interface Assignor {
  id: string;
  name: string;
}

interface Payable {
  id: string;
  value: number;
  emissionDate: Date;
  assignor: Assignor;
}

const CreatePayable: React.FC = () => {
  const [newPayable, setNewPayable] = useState<Payable>({
    id: '',
    value: 0,
    emissionDate: new Date(),
    assignor: {id: '0', name: ''},
  });
  const [assignors, setAssignors] = useState<Assignor[]>([]);
  const [payables, setPayables] = useState<Payable[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewPayable((prevPayable) => ({
      ...prevPayable,
      [name]: name === 'value' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (newPayable.id && newPayable.value && newPayable.emissionDate && newPayable.assignor) {
        const response = await axios.post(PAYABLES_URL, newPayable);

        if (response.status === 201) {
          _setDefaultPayable()
          fetchPayables();
        } else {
          alert('Erro ao cadastrar pagável. Por favor, tente novamente.');
        }
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (error) {
      alert('Erro ao cadastrar pagável. Por favor, tente novamente.');
    }
  };

  const _setDefaultPayable = () => {
    setNewPayable({
      id: '',
      value: 0,
      emissionDate: new Date(),
      assignor: {id: '0', name: ''},
    })
  }

  const fetchPayables = async () => {
    try {
      const response = await axios.get(PAYABLES_URL);

      setPayables(response.data);
    } catch (error) {
      console.error('Erro ao obter lista de pagáveis:', error);
      alert('Erro ao obter lista de pagáveis. Por favor, tente novamente.');
    }
  };

  const fetchAssignors = async () => {
    try {
      const response = await axios.get(ASSIGNOR_URL);

      setAssignors(response.data);
    } catch (error) {
      alert('Erro ao obter lista de cedentes. Por favor, tente novamente.');
    }
  }

  useEffect(() => {
    fetchPayables();
    fetchAssignors();
  }, []);

  return (
    <div>
      <h2>Cadastro de Pagável</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            ID:
            <input
              type="text"
              name="id"
              value={newPayable.id}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Valor:
            <input
              type="number"
              name="value"
              value={newPayable.value}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Data de Emissão:
            <input
              type="date"
              name="emissionDate"
              value={newPayable.emissionDate.toISOString().split('T')[0]}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Cedente:
            <select
              value={newPayable.assignor.id}
              onChange={(e) => setNewPayable((prevPayable) => ({
                ...prevPayable,
                assignor: {
                  ...prevPayable.assignor,
                  id: e.target.value,
                  name: assignors.find((assignor) => assignor.id === e.target.value)?.name || '',
                },
              }))}
            >
              <option value="" disabled>
                Selecione o Cedente
              </option>
              {assignors.map((assignor) => (
                <option key={assignor.id} value={assignor.id}>
                  {assignor.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <button type="submit">Cadastrar Pagável</button>
        </div>
      </form>
      <div>
        <h2>Lista de Pagáveis</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Valor</th>
              <th>Data de Emissão</th>
              <th>Cedente</th>
            </tr>
          </thead>
          <tbody>
            {payables.map((payable) => (
              <tr key={payable.id}>
                <td>{payable.id}</td>
                <td>{payable.value}</td>
                <td>{new Date(payable.emissionDate).toLocaleDateString()}</td>
                <td>{payable.assignor.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatePayable;
