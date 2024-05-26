'use client'
import Link from 'next/link';
import * as Styled from '../../styles';

export default function SignIn() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const login = formData.get('login');
    const password = formData.get('password');

    const data = {
      login,
      password
    }
    console.log(data);
  }

  return (
    <Styled.Main>

      <Styled.Container>
      <Styled.SubContainer>
        <Styled.Image src="/logo-bankme.png" alt="Logo" />
        <Styled.Logo>bankme</Styled.Logo>
      </Styled.SubContainer>
        <Styled.Divider />
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Title>Sign in</Styled.Title>
        <Styled.Input type="text" placeholder="Username" name='login'/>
        <Styled.Input type="password" placeholder="Password" name='password'/>
        <Styled.SubmitButton type="submit">Sign In</Styled.SubmitButton>
        <Link href="/login">Sing up</Link>
      </Styled.Form>
      </Styled.Container>
    </Styled.Main>
  );
}
