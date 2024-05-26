import { Container, Content, FooterLogin, FormContainer, Title } from './style'
import { FormLogin } from '../../components/forms/formLogin';

export const Login = () => {
  return (
    <Container>
      <Content>
        <Title>
          <h1>Login</h1>
          <p>Entre com seu usuário e senha</p>
        </Title>
        <FormContainer>
          <FormLogin />
        </FormContainer>
      </Content>
      <FooterLogin>
        <p>Para acessar o conteúdo, faça login ou cadastre-se.</p>
      </FooterLogin>
    </Container>
  )
}