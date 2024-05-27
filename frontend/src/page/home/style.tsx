import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  border-top: 1px solid var(--border-color);
  height: 100%;
  width: 100%;
`;

export const HeaderHome = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-top: 2rem;
  width: 100vw;
`;

export const LogoutButton = styled.button`
  background-color: var(--logout-color);
  position: absolute;
  border: none;
  border-radius: 0.5rem;
  color: var(--font-color);
  padding: 0.5rem;
  right: 1rem;
  top: 1rem;

    &:hover {
      background-color: var(--hover-logout-color);
      cursor: pointer;
    }
`;