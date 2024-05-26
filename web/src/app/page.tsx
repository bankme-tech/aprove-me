'use client'
import * as Styled from "./styles";
import useAuthentication from "@/hooks/useAuthentication";
import Loading from "./components/Loading";
import FormPayable from "./components/FormPayable";
import FormAssignor from "./components/FormAssignor";
import { useState } from "react";

export default function Home() {
  const [formPayable, setFormPayable] = useState<boolean>(true);
  const { loading } = useAuthentication();

  if (loading) {
    return (
        <Loading />
    );
  }

  return (
    <Styled.Main>
      <Styled.Container>
        {formPayable ? (<FormPayable />) : (<FormAssignor />)}
      <Styled.SubmitButton 
      type="button"
      onClick={() => setFormPayable((prev) => !prev)}
        style={{ width: "70%", backgroundColor: "#019901" }}
      >
        {formPayable ? "Create Assignor" : "Create Payable"}
      </Styled.SubmitButton>
      </Styled.Container>
    </ Styled.Main>
  );
}
