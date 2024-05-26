"use client";
import Link from "next/link";
import * as Styled from "../../styles/";
import * as Login from "../../styles/Login";
import { connection } from "@/connection";
import { validateLogin } from "@/utils/validateFields";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      await connection.post("/users", {
        login,
        password,
      });

      setSuccess("User created successfully");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("Invalid login or password");
      } else {
        setError("An error occurred, please try again");
      }
    }
  }

  return (
    <Styled.Main>
      <Login.Container>
        <Login.SubContainer>
          <Login.Image src="/logo-bankme.png" alt="Logo" />
          <Styled.LogoType>Bankme</Styled.LogoType>
        </Login.SubContainer>
        <Login.Divider />
        <Login.Form onSubmit={handleSubmit}>
          <Login.Title>Sign in</Login.Title>
          <Styled.Input type="text" placeholder="Username" name="login" />
          <Styled.Input
            type="password"
            placeholder="Password"
            name="password"
          />
          {error && <Styled.Error>{error}</Styled.Error>}
          <Styled.SubmitButton type="submit">Sign In</Styled.SubmitButton>
          {success && <Styled.Success>{success}</Styled.Success>}
          <Link href="/login">Sing up</Link>
        </Login.Form>
      </Login.Container>
    </Styled.Main>
  );
}
