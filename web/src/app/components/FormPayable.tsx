'use client'
import * as Styled from "../styles";
import useAuthentication from "@/hooks/useAuthentication";
import Loading from "./Loading";
import { connection } from "@/connection";
import { useEffect, useState } from "react";

export default function FormPayable() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [assignors, setAssignors] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await connection.get("/assignor");
        setAssignors(response.data);
      } catch (error: any) {
        setError(error.response.data.message);
      }
    })();
  });

  const handleCreatePayable = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const valueString = formData.get("value");
    const assignorId = formData.get("assignorId");

    setSuccess(null);
    if (!valueString || !assignorId || assignorId === "selectAssignor") {
      setError("Please fill all the fields");
      return;
    }
    const value = +valueString;
    
    if (isNaN(value) || value <= 0) {
      setError("Insert a 'value' correct");
      return;
    }
    try {
      await connection.post("/payable", {
        value,
        assignorId,
      });
      setError(null);
      setSuccess('Payable created successfully');
      setTimeout(() => {
        setSuccess(null);
      }, 1500);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  }

  return (
    <>
      <Styled.Form onSubmit={handleCreatePayable}>
        <h1>Create a new Payable</h1>
        <Styled.Input type="text" placeholder="Value" name="value" />
        <Styled.Select name="assignorId">
          <option value="selectAssignor">Select an Assignor</option>
          {assignors.map((assignor) => (
            <option key={assignor.id} value={assignor.id}>{assignor.name}</option>
          ))}
        </Styled.Select>
        {error && <Styled.Error>{error} ❌</Styled.Error>}
        {success && <Styled.Success>{success} ✔️</Styled.Success>}
        <Styled.SubmitButton type="submit">Create</Styled.SubmitButton>
      </Styled.Form>
    </>
  );
}
