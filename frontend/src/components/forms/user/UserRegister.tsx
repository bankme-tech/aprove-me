import { useEffect, useState } from 'react';
import FormButtons from '../../buttons/formButtons';
import { Container, MsgContainer, FormUserRegister, CheckButton } from './style';
import { CreateUserApi, GetUserByLoginApi } from '../../../service/UserApi';

export const UserFormRegister = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [hasUser, setHasUser] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [success, setSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCheckingUser, setIsCheckingUser] = useState(false);

	useEffect(() => {

		if (password.length > 0 && password.length < 6) {
			setError(true);
			setErrorMessage('A senha deve ter no mínimo 6 caracteres!');
			return;
		}

		if (password !== confirmPassword) {
			setError(true);
			setErrorMessage('As senhas não conferem!');
			return;
		}

		setError(false);
		setErrorMessage('');
		
	}, [password, confirmPassword]);

	const handleCheckLogin= () => {
		if (login.length === 0) {
			setError(true);
			setErrorMessage('Preencha o campo de login!');
			return true;
		}
		setErrorMessage('');
		return false;
	};
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (handleCheckLogin()) return;

		setIsSubmitting(true);
		setError(false);
		setErrorMessage('');
		setSuccess(false);

		try {
			const response = await CreateUserApi({ login, password });
			
			if (response.login && response.id) {
				setSuccess(true);
				return;
			}

			if (response.message === 'User already exists') {
				setError(true);
				setErrorMessage('Usuário já cadastrado!');
				return;
			} else {
				setError(true);
				setErrorMessage('Erro ao cadastrar usuário!');
			}

		} catch (error) {

			setError(true);
			setErrorMessage('Erro ao cadastrar usuário!');

		} finally {

			setIsSubmitting(false);

		}
	};

	const handleValidUserTest = async () => {
		
		if (handleCheckLogin()) return;

		setIsCheckingUser(true);
		setHasUser('');

		try {
			const response = await GetUserByLoginApi(login);

			if (response.statusCode === 404) {
				setHasUser('yes');
			} else {
				setHasUser('no');
			}
		} catch (error) {
			setError(true);
			setErrorMessage('Erro ao verificar usuário!');
		} finally {
			setIsCheckingUser(false);
		}
	};

  return (
    <Container>
			<FormUserRegister
				onSubmit={ handleSubmit }
			>
				<label htmlFor="login">Login:</label>
				<input
					type="text"
					id="login"
					name="login"
					onChange={ (e) => {
						setLogin(e.target.value);
						setHasUser('');
					}}
					disabled={ isSubmitting || isCheckingUser }
				/>

				<label htmlFor="test">Usuário disponível?
					<CheckButton
						type="button"
						onClick={ handleValidUserTest }
						disabled={ isSubmitting || isCheckingUser }
					>
						{ isCheckingUser ? '...' : 'Verificar' }
					</CheckButton>
					{ hasUser === 'yes' ? '✅' : hasUser === 'no' ? '❌' : '' }
				</label>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={ (e) => setPassword(e.target.value) }
					disabled={ isSubmitting || isCheckingUser }
				/>
				<label htmlFor="confirmPassword">Confirm Password:</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					onChange={ (e) => setConfirmPassword(e.target.value) }
					disabled={ isSubmitting || isCheckingUser }
				/>
				<FormButtons					
          setId={( ) => {}}
          setValue={( ) => {}}
          setAssignor={( ) => {}}
          setEmissionDate={( ) => {}}
				/>
				<MsgContainer>
					{ error && <p className='error'>{ errorMessage }</p> }
					{ success && <p className='success'>Registrado com sucesso!</p> }
				</MsgContainer>
			</FormUserRegister>
		</Container>
  )
};