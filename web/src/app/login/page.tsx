"use client";

import Link from "next/link";
import * as Styled from "../styles/Login";
import React, { useState } from "react";
import { validateLogin } from "@/utils/validateFields";
import { connection } from '@/connection'
import { useRouter } from "next/navigation";
import { Main } from "../styles";

export default function Login(): React.ReactElement {
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const login = formData.get("login");
    const password = formData.get("password");
    const { message } = validateLogin(login as string, password as string);
    if (message) {
      setError(message);
      return;
    }


    setError(null);
    try {
        const result = await connection.post('/auth', {
        login,
        password,
      });
      const token = result.data.access_token;
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("Invalid login or password");
      } else {
        setError("An error occurred, please try again");
      }
    }
  };

  return (
    <Main>
      <Styled.Container>
        <Styled.SubContainer>
          <Styled.Image src="/logo-bankme.png" alt="Logo" />
          <Styled.Logo>bankme</Styled.Logo>
        </Styled.SubContainer>
        <Styled.Divider />
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Title>Login</Styled.Title>
          <Styled.Input type="text" placeholder="Username" name="login" />
          <Styled.Input
            type="password"
            placeholder="Password"
            name="password"
          />
          {error && <Styled.Error>{error}</Styled.Error>}
          <Styled.SubmitButton type="submit">Login</Styled.SubmitButton>
          <Link href="/login/signup">Create a new User</Link>
        </Styled.Form>
      </Styled.Container>
    </Main>
  );
}
