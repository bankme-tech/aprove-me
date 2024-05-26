"use client"

import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  font-family: "Poppins", sans-serif;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  padding: 5rem;
  gap: 1rem;
  background-color: #ffffff9e;
  border-radius: 20px;
  border: 1px solid #0000001f;
  box-shadow: 0 5px 10px #0000001f;
  h1 {
    font-size: 1.5rem;
    color: #1f1f1f;
  }
`;

export const Error = styled.p`
  color: #ff0000;
`;

export const Success = styled.p`
  color: #019901;
`;

export const Input = styled.input`
  padding: 0.5rem 1rem;
  width: 100%;
  border: 1px solid #0000001f;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #0000003f;
  } &:hover {
    border-color: #0000003f;
  } &:active {
    border-color: #0000003f;
  }
`;

export const Select = styled.select`
  padding: 0.5rem 1rem;
  width: 100%;
  border: 1px solid #0000001f;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #0000003f;
  } &:hover {
    border-color: #0000003f;
  } &:active {
    border-color: #0000003f;
  }
  option {
    color: #313131;
    font-size: 0.9rem;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #000000;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #0000009e;
  }
`;