"use client";
import * as Styled from "./styles";
import useAuthentication from "@/hooks/useAuthentication";
import Loading from "./components/Loading";
import FormPayable from "./components/FormPayable";
import FormAssignor from "./components/FormAssignor";
import { useEffect, useState } from "react";

export default function Home() {
  const [formPayable, setFormPayable] = useState<boolean>(true);
  const { loading } = useAuthentication();

  if (loading) {
    return <Loading />;
  }

  return (
      <Styled.Main>
        <Styled.Container>
          {formPayable ? <FormPayable /> : <FormAssignor />}
          <Styled.CreateButton
            type="button"
            onClick={() => setFormPayable((prev) => !prev)}
          >
            {formPayable ? "Create Assignor" : "Create Payable"}
          </Styled.CreateButton>
        </Styled.Container>
      </Styled.Main>
  );
}
