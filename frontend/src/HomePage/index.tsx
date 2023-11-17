import "react-toastify/dist/ReactToastify.css";
import { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import { HomeContainer, Container, BoxPayables } from "./styles";
import { BoxPayable } from "../components/BoxPayable";
import { PayableData } from "../types/PayableData";
import { NetworkError } from "../types//NetworkError";
import Header from "../components/Header";
import PayableCreationModal from "../components/PayableCreationModal";
import * as apiServices from "../services/userService";
import AssignorCreationModal from "../components/AssignorCreationModal";
import { AssignorData } from "../types/AssignorData";

export default function HomePage() {
  const [payables, setPayables] = useState<PayableData[]>([]);
  const [assignor, setAssignor] = useState<AssignorData[]>([]);
  const [isCreatingPayable, setIsCreatingPayable] = useState(false);
  const [isCreatingAssignor, setIsCreatingAssignor] = useState(false);
  const [newPayable, setNewPayable] = useState<PayableData>({
    id: 0,
    value: "",
    emissionDate: "",
  });
  const [newAssignor, setNewAssignor] = useState<AssignorData>({
    document: "",
    email: "",
    phone: "",
    name: "",
  });

  const handleCreateAssignor = () => {
    setIsCreatingAssignor(true);
  };

  const handleCreatePayable = () => {
    setIsCreatingPayable(true);
  };

  const createAssignor = async (newAssignor: AssignorData) => {
    try {
      const response = await apiServices.createAssignor(newAssignor);
      setAssignor([response, ...assignor]);
      toast.success("Cadastro criado com sucesso!");
    } catch (error) {
      const networkError = error as NetworkError;
      toast.error(`Erro ao criar o Cadastro: ${networkError.message}`);
    }

    setIsCreatingAssignor(false);
  };

  const createPayable = async (newPayable: PayableData) => {
    try {
      const response = await apiServices.createPayable(newPayable);
      setPayables([response, ...payables]);
      toast.success("Cadastro criado com sucesso!");
    } catch (error) {
      const networkError = error as NetworkError;
      toast.error(`Erro ao criar o Cadastro: ${networkError.message}`);
    }

    setIsCreatingPayable(false);
  };

  const handlePayableDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPayable((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <HomeContainer>
      <Header />
      <Container>
        <ToastContainer />
        <div>
          <button onClick={handleCreateAssignor}>1° Cadastrar Cedentes</button>
          <button onClick={handleCreatePayable}>2° Cadastrar Pagáveis</button>
        </div>
        <BoxPayables>
          <BoxPayable />
        </BoxPayables>
      </Container>

      {isCreatingAssignor && (
        <AssignorCreationModal
          isOpen={true}
          onClose={() => setIsCreatingAssignor(false)}
          onSave={createAssignor}
        />
      )}

      {isCreatingPayable && (
        <PayableCreationModal
          isOpen={true}
          onClose={() => setIsCreatingPayable(false)}
          onSave={createPayable}
          handlePayableDataChange={handlePayableDataChange}
        />
      )}
    </HomeContainer>
  );
}
