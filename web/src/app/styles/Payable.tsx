import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 2px 15px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody tr:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #555;
  }
`;