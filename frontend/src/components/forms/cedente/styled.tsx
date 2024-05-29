import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  justify-content: center;
`;

export const FormRegisterAssignor = styled.form`
  background-color: var(--bg-form-receivables-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  margin: 20px 0;
  width: 100%;

  label {
    margin-top: 15px;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid var(--input-outline-color);
    margin-bottom: 5px;
    color: var(--input-color);

    &:focus {
      outline: 1px solid var(--input-outline-color);
    }
  }

  button {
    margin-top: 15px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin: 0 10%;
  }
`;