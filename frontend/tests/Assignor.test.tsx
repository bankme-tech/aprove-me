import { screen } from '@testing-library/react';
import { DisplayCreateAssignors } from '../src/page/assignors/page-registerAssignors';
import { renderWithRouter } from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Assignor', () => {
  it('Tem que redenrizar o formulário', async () => {
    renderWithRouter(<DisplayCreateAssignors />);
    const title = screen.getByText('Cadastro de cedentes');
    const getTextId = screen.getByText('ID:');
    const getTextName = screen.getByText('Nome:');
    const getTextPhone = screen.getByText('Telefone:');
    const getTextEmail = screen.getByText('Email:');
    const getTextDocument = screen.getByText('Documento:');

    const getDatatestId = screen.getByTestId('id-register-assignor');
    const getDatatestName = screen.getByTestId('name-register-assignor');
    const getDatatestPhone = screen.getByTestId('phone-register-assignor');
    const getDatatestEmail = screen.getByTestId('email-register-assignor');
    const getDatatestDocument = screen.getByTestId('document-register-assignor');
    const getDatatestSubmit = screen.getByTestId('submit-register-assignor');
    const getDatatestCancel = screen.getByTestId('reset-register-assignor');

    await userEvent.type(getDatatestId, '1');
    await userEvent.type(getDatatestName, 'Teste');
    await userEvent.type(getDatatestPhone, '123456789');
    await userEvent.type(getDatatestEmail, 'XXX@xxx');
    await userEvent.type(getDatatestDocument, 'XXXXXXXXXXXX');

    expect(title).toBeInTheDocument();
    expect(getTextId).toBeInTheDocument();
    expect(getTextName).toBeInTheDocument();
    expect(getTextPhone).toBeInTheDocument();
    expect(getTextEmail).toBeInTheDocument();
    expect(getTextDocument).toBeInTheDocument();
    expect(getDatatestId).toBeInTheDocument();
    expect(getDatatestName).toBeInTheDocument();
    expect(getDatatestPhone).toBeInTheDocument();
    expect(getDatatestEmail).toBeInTheDocument();
    expect(getDatatestDocument).toBeInTheDocument();

    expect(getDatatestId).toHaveValue('1');
    expect(getDatatestName).toHaveValue('Teste');
    expect(getDatatestPhone).toHaveValue('123456789');
    expect(getDatatestEmail).toHaveValue('XXX@xxx');
    expect(getDatatestDocument).toHaveValue('XXXXXXXXXXXX');

    await userEvent.click(getDatatestCancel);

    expect(getDatatestId).toHaveValue('');
    expect(getDatatestName).toHaveValue('');
    expect(getDatatestPhone).toHaveValue('');
    expect(getDatatestEmail).toHaveValue('');
    expect(getDatatestDocument).toHaveValue('');

    await userEvent.type(getDatatestId, '1');
    await userEvent.type(getDatatestName, 'Teste');
    await userEvent.type(getDatatestPhone, '123456789');
    await userEvent.type(getDatatestEmail, 'XXX@xxx');
    await userEvent.type(getDatatestDocument, 'XXXXXXXXXXXX');

    await userEvent.click(getDatatestSubmit);
    
    const warning = await screen.findByText('ID inválido! Insira um ID válido no formato UUID');

    expect(warning).toBeInTheDocument();
  });
});
