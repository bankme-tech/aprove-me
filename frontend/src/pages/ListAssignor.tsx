import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";

interface Assignor {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
}

const ListAssignor = () => {

  const [assignors, setAssignors] = useState<Assignor[]>([]);
  const ASSIGNOR_URL = 'http://localhost:3001/integrations/assignor';


  const fetchAssignors = async () => {
    try {
      const response = await axios.get(ASSIGNOR_URL);
      setAssignors(response.data);
    } catch (error) {
      console.error('Erro ao obter lista de cedentes:', error);
    }
  }

  useEffect(() => {
    fetchAssignors();
  })

  return (
    <div>
      <Header />
      <h1>Lista de Cedentes</h1>
      <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {assignors.map((assignor) => (
              <tr key={assignor.id}>
                <td>{assignor.id}</td>
                <td>{assignor.name}</td>
                <td>{assignor.email}</td>
                <td>{assignor.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      <Footer />
    </div>
  );
}

export default ListAssignor