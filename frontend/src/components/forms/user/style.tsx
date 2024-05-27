import { styled } from 'styled-components'

export const Container = styled.div`
background-color: var(--bg-main-register-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 2rem;
  width: 20vw;
  height: 50vh;
`; 

export const FormUserRegister = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const MsgContainer = styled.div`
  position: absolute;
  top: 74vh;
  left: 0;
  width: 100vw;

  p {
   &.error {
     color: var(--error-color);
     text-align: center;
     font-size: 1rem;
   }
   &.success {
     color: var(--success-color);
     text-align: center;
     font-size: 1rem;
   }
  }
`;

export const CheckButton = styled.button`
  background-color: var(--bg-button-register-color);
  border: none;
  cursor: pointer;
  margin: 0 1rem;
  padding: 0.3rem;
  border-radius: 5px;
  font-size: 0.8rem;
`;