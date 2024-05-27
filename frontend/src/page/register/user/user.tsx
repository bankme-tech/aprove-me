import { Link } from 'react-router-dom';
import { UserFormRegister } from '../../../components/forms/user/UserRegister';
import { Container, FooterRegister, FormContainer, Title } from './styles';

export const UserRegister = () => {

	return (
		<Container>
			<Title>
				<h1>Cadastro</h1>
			</Title>
			
			<FormContainer>
				<UserFormRegister />
			</FormContainer>

			<FooterRegister>
				<p>Ao invés disso, <Link to="/">faça login</Link>.</p>
			</FooterRegister>
		</Container>
	)
};