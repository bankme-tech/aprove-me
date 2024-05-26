import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
  color: #333;
`;

export const Card = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  padding: 3rem;
  border: 1px solid #333;
  border-radius: 5px;
  margin-top: 1rem;
  gap: 1rem;
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

export const Divider = styled.div`
  height: 1px;
  background-color: #333;
  width: 200px;
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

export const Paragraph = styled.p`
  font-size: 1rem;
  color: #333;
  span {
    font-weight: bold;
  }
`;
