import React, { useState } from "react";
import { AssignorCreationModalProps } from "../../types/AssignorCreationModalProps";
import { AssignorData } from "../../types/AssignorData";
import {
  ModalOverlay,
  ModalContent,
  InputContainer,
  Input,
  ButtonContainer,
  SaveButton,
  CancelButton,
} from "./styles";

const AssignorCreationModal: React.FC<AssignorCreationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [newAssignor, setNewAssignor] = useState<AssignorData>({
    document: "",
    email: "",
    phone: "",
    name: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(newAssignor);
  };

  return (
    <ModalOverlay style={{ display: isOpen ? "flex" : "none" }}>
      <ModalContent>
        <h1>Cadastrar Cedentes</h1>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              type="text"
              name="document"
              value={newAssignor.document}
              onChange={(e) => {
                setNewAssignor({
                  ...newAssignor,
                  document: e.target.value,
                });
              }}
              placeholder="Documento CPF ou CNPJ"
            />
            <Input
              type="text"
              name="email"
              value={newAssignor?.email || ""}
              onChange={(e) => {
                setNewAssignor({
                  ...newAssignor,
                  email: e.target.value,
                });
              }}
              placeholder="Email"
            />
            <Input
              type="text"
              name="phone"
              value={newAssignor?.phone || ""}
              onChange={(e) => {
                setNewAssignor({
                  ...newAssignor,
                  phone: e.target.value,
                });
              }}
              placeholder="Telefone"
            />
            <Input
              type="text"
              name="name"
              value={newAssignor?.name || ""}
              onChange={(e) => {
                setNewAssignor({
                  ...newAssignor,
                  name: e.target.value,
                });
              }}
              placeholder="Nome"
            />
          </InputContainer>
          <ButtonContainer>
            <SaveButton type="submit">Salvar</SaveButton>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AssignorCreationModal;
