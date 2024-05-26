"use client"

import styled from "styled-components";

export const Image = styled.img`
  max-width: 100px;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 40%;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  color: #0b36c0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const Error = styled.p`
  color: #ff0000;
`;

export const Success = styled.p`
  color: #008000;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 4rem;
  height: 500px;
  width: 900px;
  max-width: 90vw;
  background-color: #ffffff9e;
  border-radius: 20px;
  border: 1px solid #0000001f;
  box-shadow: 0 5px 10px #0000001f;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 40%;
  a {
    text-decoration: none;
    color: #0b36c0;
    &:hover {
    text-decoration: underline;
  }
  }
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

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #1f1f1f;
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #0b36c0;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #0b35c0b2;
  } &:active {
    background-color: #0b35c0b2;
  }
`;

export const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: #0000001f;
`;