import { screen } from '@testing-library/react';
import { UserRegister } from '../src/page/register/user/user';
import { renderWithRouter } from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('User', () => {
  test('Tem que redenrizar o formulário', async () => {
    renderWithRouter(<UserRegister />);

    const getTextLogin = screen.getByText('Login:');
    const getTextPassword = screen.getByText('Password:');
    const getTextMatchPassword = screen.getByText('Confirm Password:');
    const getTextCheckUser = screen.getByText('Usuário disponível?');
    const getTextButtonMatchText = screen.getByText('Verificar');
    const getButtonSubmit = screen.getByText('Enviar');
    const getButtonClean = screen.getByText('Limpar');

    const getDataTestIDLogin = screen.getByTestId('login-register-user');
    const getDataTestIDPassword = screen.getByTestId('password-register-user');
    const getDataTestIDMatchPassword = screen.getByTestId('confirmPassword-register-user');
    const getDataTestIDCheckUser = screen.getByTestId('checkuser-span');

    await userEvent.type(getDataTestIDLogin, 'test');
    await userEvent.type(getDataTestIDPassword, 'test');
    await userEvent.type(getDataTestIDMatchPassword, 'test');
    await userEvent.click(getDataTestIDCheckUser);

    expect(getDataTestIDLogin).toHaveValue('test');
    expect(getDataTestIDPassword).toHaveValue('test');
    expect(getDataTestIDMatchPassword).toHaveValue('test');
    expect(getDataTestIDCheckUser).toHaveTextContent('');
    expect(getTextButtonMatchText).toHaveTextContent('Verificar');
    expect(getButtonSubmit).toHaveTextContent('Enviar');
    expect(getButtonClean).toHaveTextContent('Limpar');
    expect(getTextLogin).toBeInTheDocument();
    expect(getTextPassword).toBeInTheDocument();
    expect(getTextMatchPassword).toBeInTheDocument();
    expect(getTextCheckUser).toBeInTheDocument();
    expect(getTextButtonMatchText).toBeInTheDocument();

    await userEvent.click(getButtonSubmit);

    await userEvent.click(getButtonClean);

    expect(getDataTestIDLogin).toHaveValue('');
    expect(getDataTestIDPassword).toHaveValue('');
    expect(getDataTestIDMatchPassword).toHaveValue('');
  });
});