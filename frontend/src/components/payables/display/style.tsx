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
`;