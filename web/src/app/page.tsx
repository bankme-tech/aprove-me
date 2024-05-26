'use client'
import * as Styled from "./styles";
import useAuthentication from "@/hooks/useAuthentication";
import Loading from "./components/Loading";
import FormPayable from "./components/FormPayable";
import FormAssignor from "./components/FormAssignor";

export default function Home() {
  const { loading } = useAuthentication();

  if (loading) {
    return (
        <Loading />
    );
  }

  return (
    <Styled.Main>
      <FormPayable />
      <FormAssignor />
    </ Styled.Main>
  );
}
