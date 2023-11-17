import styled from "styled-components";

export const Topics = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 100%;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 10px 0;

  h1 {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    background: #e0e0e0;
    margin: 0;
    border-radius: 8px;
  }
`;

export const Payable = styled.div`
  width: 100%; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  padding: 10px 0;
  background: #fff;
  border-radius: 8px;
  transition: background 0.3s;

  &:hover {
    background: #f2f2f2;
  }

  h1 {
    font-size: 16px;
    text-align: center;
    padding: 10px;
    background: #f8f8f8;
    margin: 0;
    border-radius: 8px;
  }

  .button-container {
    display: flex;
    align-items: center;

    button {
      border: none;
      background: #007bff;
      color: #fff;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.3s;

      &:hover {
        background: #0056b3;
      }

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
    .delete-button {
      background: #ff0000;
      &:hover {
        background: #cc0000;
      }
    }
  }
`;