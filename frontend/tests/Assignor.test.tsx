import { screen } from '@testing-library/react';
import { DisplayCreateAssignors } from '../src/page/assignors/page-registerAssignors';
import { renderWithRouter } from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import { DisplayAssignors } from '../src/page/assignors/page-listAssignor';
import { AssignorsDetails } from '../src/page/assignors/page-assignorsDetails';

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

    await userEvent.type(getDatatestId, '74b862fd-b309-48fb-0000-b6e17ee4e2d2');
    await userEvent.type(getDatatestName, 'Teste');
    await userEvent.type(getDatatestPhone, '123456789');
    await userEvent.type(getDatatestEmail, 'XXX@xxx');
    await userEvent.type(getDatatestDocument, 'XXXXXXXXXXXX');

    await userEvent.click(getDatatestSubmit);
    
    const dataTestIdModal = await screen.findByTestId('modal-assignor-info');
    const getTextNameModal = screen.getAllByText('Nome:');
    const getTextPhoneModal = screen.getAllByText('Telefone:');
    const getTextEmailModal = screen.getAllByText('Email:');
    const getTextDocumentModal = screen.getAllByText('Documento:');
    const getDatatestSubmitModal = screen.getByText('Confirmar');
    const getDatatestCancelModal = screen.getByText('Cancelar');


    expect(dataTestIdModal).toBeInTheDocument();
    expect(getTextNameModal.length).toBe(2);
    expect(getTextPhoneModal.length).toBe(2);
    expect(getTextEmailModal.length).toBe(2);
    expect(getTextDocumentModal.length).toBe(2);

    await userEvent.click(getDatatestSubmitModal);

    await userEvent.click(getDatatestCancelModal);
    
    expect(dataTestIdModal).not.toBeInTheDocument();
  });

  describe('Lista de cedentes', () => {
    it('Tem que redenrizar a lista de cedentes', async () => {
      renderWithRouter(<DisplayAssignors />);
      const title = screen.getByText('Lista de Cedentes');
      const butnCreate = screen.getByText('Registrar cedente');
      const getId = screen.getByText('ID');
      const getName = screen.getByText('Nome');
      const getPhone = screen.getByText('Telefone');
      const getEmail = screen.getByText('Email');
      const getDocument = screen.getByText('Documento');

      await userEvent.click(butnCreate);
      expect(title).toBeInTheDocument();
      expect(butnCreate).toBeInTheDocument();
      expect(getId).toBeInTheDocument();
      expect(getName).toBeInTheDocument();
      expect(getPhone).toBeInTheDocument();
      expect(getEmail).toBeInTheDocument();
      expect(getDocument).toBeInTheDocument();
    });
    test('Detalhe do cedente', async () => {
      renderWithRouter(<AssignorsDetails />);
      const title = screen.getByText('Detalhes do Cedente');
      const ID = screen.getByText('ID');
      const getName = screen.getByText('Nome');
      const getPhone = screen.getByText('Telefone');
      const getEmail = screen.getByText('Email');
      const getDocument = screen.getByText('Documento');

      expect(title).toBeInTheDocument();
      expect(ID).toBeInTheDocument();
      expect(getName).toBeInTheDocument();
      expect(getPhone).toBeInTheDocument();
      expect(getEmail).toBeInTheDocument();
      expect(getDocument).toBeInTheDocument();
    });
  });
});
