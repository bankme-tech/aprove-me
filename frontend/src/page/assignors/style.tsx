import { styled } from 'styled-components'


export const RegisterAssignorContainer = styled.div`
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

export const AssingorDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  width: 100%;
`;