// src/components/CadastroCedente.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Assignor from '../interfaces/assignor.interface';

const ASSIGNOR_URL = 'http://localhost:3001/integrations/assignor';

const CreateAssignor: React.FC = () => {
  const [newAssignor, setNewAssingor] = useState<Assignor>({
    name: '',
    email: '',
    document: '',
    phone: '',
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
      if (newAssignor.name) {
        const response = await axios.post(ASSIGNOR_URL, newAssignor);

        if (response.status === 201) {
          console.log('Cedente cadastrado com sucesso:', response.data);
          _setDefaultAssignor()
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

  const _setDefaultAssignor = () => {
    setNewAssingor({
      name: '',
      email: '',
      document: '',
      phone: '',
    });
  }

  return (
    <div>
      <Header />
      <h2>Cadastro de Cedente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nome do Cedente:
            <input
              type="text"
              name="name"
              value={newAssignor.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <div>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={newAssignor.email}
                onChange={handleInputChange}
                required
                />
            </label>
          </div>
          <div>
            <label>
              Documento:
              <input
                type="text"
                name="document"
                value={newAssignor.document}
                onChange={handleInputChange}
                required
                />
            </label>
          </div>
          <div>
            <label>
              Telefone:
              <input
                type="text"
                name="phone"
                value={newAssignor.phone}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
        </div>
        <div>
          <button type="submit">Cadastrar Cedente</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default CreateAssignor;