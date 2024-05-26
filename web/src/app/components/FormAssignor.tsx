"use client";
import * as Styled from "../styles";
import useAuthentication from "@/hooks/useAuthentication";
import Loading from "./Loading";
import { connection } from "@/connection";
import { useState } from "react";
import { validateAssignor } from "@/utils/validateFields";

type NumberValues = {
  phone: string;
  document: string;
};

export default function FormAssignor() {
  const [errors, setErrors] = useState<string[]>([]);
  const [numberValues, setNumberValues] = useState<NumberValues>({
    phone: "",
    document: "",
  });
  const [success, setSuccess] = useState<string | null>(null);
  const { loading } = useAuthentication();

  const handleChangeNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (/^\d*$/.test(value)) {
      setNumberValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreatePayable = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const document = formData.get("document");
    const email = formData.get("email");
    const phone = formData.get("phone");
    if (!name || !document || !email || !phone) {
      setErrors(["Please fill all fields"]);
      return;
    }
    const data = {
      name: name as string,
      document: document as string,
      email: email as string,
      phone: phone as string,
    };

    const error = validateAssignor(data);
    if (error.length !== 0) {
      setErrors(error);
      return;
    }
    try {
      await connection.post("/assignor", data);
      setErrors([]);
      setSuccess("Assignor created successfully");
      setTimeout(() => {
        setSuccess(null);
      }, 2500);
    } catch (error: any) {
      setErrors([error.response.data.message]);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Styled.Form onSubmit={handleCreatePayable}>
        <h1>Create a new Assignor</h1>
        <Styled.Input type="text" placeholder="Name" name="name" />
        <Styled.Input type="text" placeholder="Document" name="document" 
          onChange={handleChangeNumbers}
          value={numberValues.document}
        />
        <Styled.Input type="email" placeholder="Email" name="email" />
        <Styled.Input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={handleChangeNumbers}
          value={numberValues.phone}
        />
        {errors.length !== 0 &&
          errors.map((erros, index) => <Styled.Error key={index}>{erros} ❌</Styled.Error>)}
        {success && <Styled.Success>{success} ✔️</Styled.Success>}
        <Styled.SubmitButton type="submit">Create</Styled.SubmitButton>
      </Styled.Form>
    </>
  );
}
