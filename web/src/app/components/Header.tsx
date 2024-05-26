import * as Styled from "../styles";

export default function Header() {
  return (
    <Styled.Header>
      <Styled.Nav>
        <Styled.Logo src="logo-bankme.png" alt="logo" />
        <Styled.NavLink href="/logout">Logout</Styled.NavLink>
      </Styled.Nav>
    </Styled.Header>
  );
};
