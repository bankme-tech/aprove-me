import styled from "styled-components";

export const HeaderConteiner = styled.header`
  background-color: white;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.09);

  @media screen and (max-width: 768px) {
    height: 12vh;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .logo {
    height: 15vh;
    padding: 10px;
    cursor: pointer;
  }
`;
