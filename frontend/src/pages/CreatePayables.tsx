import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/payable-table.css';

const PAYABLES_URL = 'localhost:3000/integrations/payable';

interface Pagamento {
  id: string;
  value: number;
  emissionDate: Date;
  assignor: number;
}

const CreatePayable: React.FC = () => {
  const [newPayable, setNewPayable] = useState<Pagamento>({
    id: '',
    value: 0,
    emissionDate: new Date(),
    assignor: 0,
  });

  const [payables, setPayables] = useState<Pagamento[]>([]);

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
          console.log('Pagável cadastrado com sucesso:', response.data);
          _setDefaultPayable()
          fetchPayables();
        } else {
          console.error('Erro ao cadastrar pagável:', response.data);
          alert('Erro ao cadastrar pagável. Por favor, tente novamente.');
        }
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar pagável:', error);
      alert('Erro ao cadastrar pagável. Por favor, tente novamente.');
    }
  };

  const _setDefaultPayable = () => {
    setNewPayable({
      id: '',
      value: 0,
      emissionDate: new Date(),
      assignor: 0,
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

  useEffect(() => {
    fetchPayables();
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
            <input
              type="number"
              name="assignor"
              value={newPayable.assignor}
              onChange={handleInputChange}
              required
            />
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
                <td>{payable.assignor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatePayable;
