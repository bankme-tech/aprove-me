'use client'
import * as Styled from "./styles";
import useAuthentication from "@/hooks/useAuthentication";
import Loading from "./components/Loading";
import { connection } from "@/connection";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { loading } = useAuthentication();

  const handleCreatePayable = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const valueString = formData.get("value");
    const assignorId = formData.get("assignorId");
    
    if (!valueString || !assignorId) {
      setError("Please fill all the fields");
      return;
    }
    const value = +valueString;
    if (value <= 0) {
      setError("Insert a value correct");
      return;
    }
    try {
      await connection.post("/payable", {
        value,
        assignorId,
      });
      setError(null);
      setTimeout(() => {
        setSuccess('Payable created successfully');
      }, 1500);
    } catch (error: any) {
      console.error(error);
    }
  }

  if (loading) {
    return (
        <Loading />
    );
  }

  return (
    <Styled.Main>
      <Styled.Form onSubmit={handleCreatePayable}>
        <h1>Create a new Payable</h1>
        <Styled.Input type="text" placeholder="Value" name="value" />
        <Styled.Input type="text" placeholder="Assignor" name="assignorId" />
        {error && <Styled.Error>{error}</Styled.Error>}
        {success && <Styled.Success>{success}</Styled.Success>}
        <Styled.SubmitButton type="submit">Create</Styled.SubmitButton>
      </Styled.Form>
    </Styled.Main>
  );
}
