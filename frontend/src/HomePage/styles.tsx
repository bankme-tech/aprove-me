import styled from "styled-components";

export const HomeContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Quicksand", Arial, sans-serif;
`;

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 20vh);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;

  p {
    font-size: 20px;
    padding: 50px;
  }

  button {
    border: none;
    background: #459aaf;
    color: #ffffff;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 2px;

    transition: background 0.3s;

    &:hover {
      background: #82bdcb;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export const BoxPayables = styled.div`
  width: 60vw;
  max-height: 100%;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 80px;
`;
