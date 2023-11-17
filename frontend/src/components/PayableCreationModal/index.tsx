import React, { useState } from "react";
import { PayableCreationModalProps } from "../../types/PayableCreationModalProps";
import { PayableData } from "../../types/PayableData";
import {
  ModalOverlay,
  ModalContent,
  InputContainer,
  Input,
  ButtonContainer,
  SaveButton,
  CancelButton,
} from "./styles";

const PayableCreationModal: React.FC<PayableCreationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [newPayable, setNewPayable] = useState<PayableData>({
    id: 0,
    value: "",
    emissionDate: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(newPayable);
  };

  return (
    <ModalOverlay style={{ display: isOpen ? "flex" : "none" }}>
      <ModalContent>
        <h1>Cadastrar Pagáveis</h1>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              type="text"
              name="value"
              value={newPayable.value}
              onChange={(e) => {
                setNewPayable({
                  ...newPayable,
                  value: e.target.value,
                });
              }}
              placeholder="Valor"
            />
            <Input
              type="text"
              name="email"
              value={newPayable?.emissionDate || ""}
              onChange={(e) => {
                setNewPayable({
                  ...newPayable,
                  emissionDate: e.target.value,
                });
              }}
              placeholder="Data de Emissão"
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

export default PayableCreationModal;