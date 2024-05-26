'use client'
import * as Styled from "./styles";
import useAuthentication from "@/hooks/useAuthentication";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";

export default function Home() {
  const { loading } = useAuthentication();

  if (loading) {
    return (
        <Loading />
    );
  }

  return (
    <Styled.Main>
      <h1>Page Principal</h1>
    </Styled.Main>
  );
}
