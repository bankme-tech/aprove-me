// src/components/CadastroCedente.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Cedente {
  id: number;
  nome: string;
}

const CreateAssignor: React.FC = () => {
  const [newAssignor, setNewAssingor] = useState<Cedente>({
    id: 0,
    nome: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAssingor((prevAssignor) => ({
      ...prevAssignor,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (newAssignor.nome) {
        const response = await axios.post('sua_api_backend/cedentes', newAssignor);

        if (response.status === 201) {
          console.log('Cedente cadastrado com sucesso:', response.data);
        } else {
          console.error('Erro ao cadastrar cedente:', response.data);
          alert('Erro ao cadastrar cedente. Por favor, tente novamente.');
        }
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar cedente:', error);
      alert('Erro ao cadastrar cedente. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Cedente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nome do Cedente:
            <input
              type="text"
              name="nome"
              value={newAssignor.nome}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Cadastrar Cedente</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignor;