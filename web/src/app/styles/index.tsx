"use client";

import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  font-family: "Poppins", sans-serif;
  padding-top: 100px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  /* margin-top: 90px; */
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
    font-size: 1.3rem;
    color: #1f1f1f;
    text-transform: uppercase;
    font-weight: 800;
    margin-bottom: 1rem;
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
  }
  &:hover {
    border-color: #0000003f;
  }
  &:active {
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
  }
  &:hover {
    border-color: #0000003f;
  }
  &:active {
    border-color: #0000003f;
  }
  option {
    color: #313131;
    font-size: 1rem;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #131fbd;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #131ebdc7;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  width: 100%;
  position: fixed;
  background-color: #ffffff;
  box-shadow: 0 5px 10px #0000001f;
`;

export const Logo = styled.img`
  width: 25px;
  margin-right: 1rem;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1024px;
  gap: 1rem;
  a {
    color: #000000;
    font-size: 1rem;
    margin-left: 1rem;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: #0000009e;
    }
  }
`;

export const Loggout = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  background-color: #131fbd;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #131ebdc7;
  }
`;	

export const Links = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
`;

export const CreateButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #65bd13;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #65bd13da;
  }
`;