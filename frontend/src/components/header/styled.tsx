import { styled } from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: var(--bg-header-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
  border-bottom: 1px solid var(--border-color);

    div {
      background-color: var(--bg-time-color);
      position: absolute;
      left: 0;
      display: flex;
      justify-content: space-around;
      padding: 0.5rem;
      width: 22%;
    }
`;

export const HeaderContent = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 50%;
      margin-left: 12%;
    }

    a {
      margin: 0 1rem;
      text-decoration: none;
      color: var(--font-color);
      border-bottom: 1px solid transparent;

      &:hover {
        color: var(--font-hover-color);
        border-bottom: 1px solid var(--font-hover-color);
      }
    }
`;

export const LogoutButton = styled.button`
  background-color: var(--logout-color);
  position: absolute;
  border: none;
  border-radius: 0.5rem;
  color: var(--font-color);
  padding: 0.5rem;
  right: 1rem;
  top: 0.5rem;

    &:hover {
      background-color: var(--hover-logout-color);
      cursor: pointer;
    }
`;