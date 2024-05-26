import Link from "next/link";
import * as Styled from "../styles";

export default function Header() {
  return (
    <Styled.Header>
      <Styled.Nav>
        <Styled.Logo src="logo-bankme.png" alt="logo" />
        <Styled.Links>
          <Link href="/payable">
            Payables
          </Link>
          <Link href="/assignor">
            Assignors
          </Link>
        </Styled.Links>
          <Styled.Loggout>
            Loggout
          </Styled.Loggout>
      </Styled.Nav>
    </Styled.Header>
  );
};
