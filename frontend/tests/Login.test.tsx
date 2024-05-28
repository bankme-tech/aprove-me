import { screen } from '@testing-library/react';
import App from '../src/App';
import { renderWithRouter } from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('App', () => {
	test('Verifica de o input de login está na tela', () => {
		renderWithRouter(<App />);

		const inputLogin = screen.getByLabelText('Login:');
		expect(inputLogin).toBeInTheDocument();
	});
	test('Verifica de o input de senha está na tela', () => {
		renderWithRouter(<App />);

		const inputPassword = screen.getByLabelText('Senha:');
		expect(inputPassword).toBeInTheDocument();
	});
	test('Verifica de o botão de login está na tela', () => {
		renderWithRouter(<App />);

		const buttonLogin = screen.getByText('Enviar');
		expect(buttonLogin).toBeInTheDocument();
	});
	test('Verifica de o botão de cancelar está na tela', () => {
		renderWithRouter(<App />);

		const buttonLogin = screen.getByText('Limpar');
		expect(buttonLogin).toBeInTheDocument();
	});
	test('Verifica de o input login está na tela e é required', () => {
		renderWithRouter(<App />);
		const inputLogin = screen.getByTestId('login');
		expect(inputLogin).toBeRequired();
	});
	test('Verifica de o input senha está na tela e é required', () => {
		renderWithRouter(<App />);
		const inputPassword = screen.getByTestId('password');
		expect(inputPassword).toBeRequired();
	});
	test('Verifica se é possivel digitar no input de login', async () => {
		renderWithRouter(<App />);
		const inputLogin = screen.getByTestId('login');
		await userEvent.type(inputLogin, 'teste');
		expect(inputLogin).toHaveValue('teste');
	});
	test('Verifica se é possivel digitar no input de senha', async () => {
		renderWithRouter(<App />);
		const inputLogin = screen.getByTestId('password');
		await userEvent.type(inputLogin, 'teste');
		expect(inputLogin).toHaveValue('teste');
	});
	test('Verifica se o botão Limpar limpa os inputs', async () => {
		renderWithRouter(<App />);
		const inputLogin = screen.getByTestId('login');
		const inputPassword = screen.getByTestId('password');
		const buttonClear = screen.getByText('Limpar');
		await userEvent.type(inputLogin, 'teste');
		await userEvent.type(inputPassword, 'teste');
		await userEvent.click(buttonClear);
		expect(inputLogin).toHaveValue('');
		expect(inputPassword).toHaveValue('');
	});
	test('Verifica se aparece mensagem de erro ao tentar fazer login com dados inválidos', async () => {
		renderWithRouter(<App />);
		const inputLogin = screen.getByTestId('login');
		const inputPassword = screen.getByTestId('password');
		const buttonLogin = screen.getByText('Enviar');
		await userEvent.type(inputLogin, 'teste');
		await userEvent.type(inputPassword, 'teste1');
		await userEvent.click(buttonLogin);
		const errorMsg = await screen.findByText('Usuário ou senha inválidos!');

		expect(errorMsg).toBeInTheDocument();
	});
	test('Verifica se é possivel fazer login', async () => {
		renderWithRouter(<App />);
		const inputLogin = screen.getByTestId('login');
		const inputPassword = screen.getByTestId('password');
		const buttonLogin = screen.getByText('Enviar');
		await userEvent.type(inputLogin, 'admin');
		await userEvent.type(inputPassword, '123123');
		await userEvent.click(buttonLogin);
		const loggedMsg = await screen.findByText('Logado com sucesso! Redirecionando...');

		expect(loggedMsg).toBeInTheDocument();
	});
});
