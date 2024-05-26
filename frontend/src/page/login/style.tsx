import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Title = styled.div`
  margin: 20px;
  font-size: 24px;
  text-align: center;

  h1 {
    color: var(--h1-color);
  }
  p {
    color: var(--p-color);
  }
`;

export const FormContainer = styled.div`
  margin: 20px;
  width: 70%;
`;

export const FooterLogin = styled.footer`
  margin: 20px;
  text-align: center;
  padding: 10px;

  p {
    color: var(--p-color);
  }
`;