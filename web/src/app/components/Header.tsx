import Link from "next/link";
import * as Styled from "../styles";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/tokenUtils";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const handleLoggout = () => {
    removeToken();
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  },[router])

  return (
    <Styled.Header>
      <Styled.Nav>
        <Styled.LogoType onClick={() => router.push('/')} >Bankme</Styled.LogoType>
        <Styled.Links>
          <Link href="/payable">Payables</Link>
          <Link href="/assignor">Assignors</Link>
        </Styled.Links>
        <Styled.Loggout type="button" onClick={handleLoggout}>
          Loggout
        </Styled.Loggout>
      </Styled.Nav>
    </Styled.Header>
  );
}
