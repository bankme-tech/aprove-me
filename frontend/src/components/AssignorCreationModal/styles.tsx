import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
  }
`;

export const ModalContent = styled.div`
  background: #fff;
  max-width: 100%;
  width: 30vw;
  max-height: 80vh;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    max-width: 400px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 10px;
  align-items: center;
`;

export const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
  width: 25vw;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const SaveButton = styled.button`
  background: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background 0.3s, transform 0.2s;
  text-align: center;

  &:hover {
    background: #0056b3;
  }
`;

export const CancelButton = styled.button`
  background: #dc3545;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background 0.3s, transform 0.2s;
  text-align: center;

  &:hover {
    background: #c82333;
  }
`;