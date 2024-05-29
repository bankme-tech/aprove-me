import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TablePayables = styled.table`
  width: 80vw;
  border-collapse: collapse;
  margin-top: 2rem;

  th, td {
    padding: 1rem;
    border: 1px solid #ccc;
  }

  td {
    text-align: center;
  }

  button.details {
    background-color: transparent;
    margin-right: 2rem;
    cursor: pointer;
  }
`;

export const HeaderPayable = styled.header`
  display: flex;
  align-items: center;
  margin: 1rem;
  gap: 1rem;
  width: 80vw;
  padding: 1rem;
  
  button {
    background-color: var(--bg-button-color);
    width: 15%;
    height: 2rem;
    border: none;
    border-radius: 0.5rem;
    color: var(--text-button-color);
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: var(--bg-button-hover-color);
    }
  }
  h1 {
    width: 70%;
    text-align: center;
  }
`;

export const ContainerRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  height: 90%;

  select {
    width: 100%;
    height: 2rem;
    border-radius: 0.3rem;
    border: none;
    padding: 0.2rem;
    margin-bottom: 1rem;
    color: var(--font-color-2);
    outline: 1px solid var(--input-outline-color);
    cursor: pointer;

    option {
      color: var(--font-color-2);
      cursor: pointer;
    }
  }

`;

export const Warnings = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  left: 0;
  top: 85vh;
`;


//////********************************///////////////

export const ModalContainer = styled.div`
  background-color: #fff;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 50%;
  height: 50%;
  left: 25%;
  top: 25%;

  h2 {
    margin-bottom: 2vh;
    color: var(--modal-h2-color);
  }

  p {
    margin-bottom: 1vh;
    color: var(--modal-p-color);
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    margin-top: 3vh;

    button {
      margin: 1vh;
      padding: 1vh;
      border-radius: 5px;
      color: var(--modal-button-color);
      border: none;
      cursor: pointer;

      &.submit {
        background-color: var(--modal-submit-button-color);

        &:hover {
          background-color: var(--modal-submit-button-hover-color);
        }
      }

      &.cancel {
        background-color: var(--modal-cancel-button-color);

        &:hover {
          background-color: var(--modal-cancel-button-hover-color);
        }
      }
    }
  }
`;

export const EditContainer = styled.div`
  background-color: var(--modal-bg-color);
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  button.close {
    background-color: transparent;
    position: absolute;
    top: 30vh;
    right: 36vw;
    border: 1px solid #888;
    cursor: pointer;
  }
`;

export const PayablesDetailsContainer = styled.div`
  background-color: var(--modal-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5vh;
  height: 92vh;
  width: 100%;
  
  h1 {
    margin-bottom: 1vh;
  }

  h2 {
    margin-top: 2vh;
  }

  button {
    background-color: var(--success-color);
    top: 30vh;
    right: 88vh;
    border: none;
    border-radius: 5px;
    padding: 1vh;
    margin: 1vh;
    cursor: pointer;
  }
`;