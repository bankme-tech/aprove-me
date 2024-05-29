import { screen } from '@testing-library/react';
import { DisplayPayables } from '../src/page/payables/page-Listpayables';
import { renderWithRouter } from './helpers/renderWithRouter';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { DisplayCreatePayable } from '../src/page/payables/page-registerPayable';
import { DetailsPayables } from '../src/page/payables/page-details';

const mockPayables = [
  {
    id: '74b862fd-b309-48fb-9062-b6e17ee4e2d2',
    value: 1000000000,
    emissionDate: '2021-03-19',
    assignor: '74b862fd-b309-48fb-0000-b6e17ee4e2d2'
  }
];

describe('Payable', () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Deve Renderizar', () => {
    renderWithRouter(<DisplayPayables />);
    const payableElement = screen.getByText('Lista de Pagáveis');
    expect(payableElement).toBeInTheDocument();
  });

  test('Tem uma table', () => {
    renderWithRouter(<DisplayPayables />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
  
  test('A table tem as colunas corretas', () => {
    renderWithRouter(<DisplayPayables />);
    const getCollumnId = screen.getByText('ID');
    const getCollumnValue = screen.getByText('Valor');
    const getCollumnDate = screen.getByText('Data de Emissão');
    const getCollumnConfig = screen.getByText('Config');

    expect(getCollumnId).toBeInTheDocument();
    expect(getCollumnValue).toBeInTheDocument();
    expect(getCollumnDate).toBeInTheDocument();
    expect(getCollumnConfig).toBeInTheDocument();
  });
  test('Tem os botões corretos', async () => {
    
    const fetchResolved = {
      json: async () => mockPayables,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolved);
    
    renderWithRouter(<DisplayPayables />);

    const buttonDetail = await screen.findByTestId('details');
    const buttonDelete = await screen.findByTestId('delete');
    const buttonEdit = await screen.findByTestId('edit');

    expect(buttonDetail).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
    expect(buttonEdit).toBeInTheDocument();
    return mockFetch;
  });

  test('Button details é clicavel', async () => {
    
    const fetchResolved = {
      json: async () => mockPayables,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolved);

    renderWithRouter(<DisplayPayables />);

    const buttonDetail = await screen.findByTestId('details');
    await userEvent.click(buttonDetail);
    return mockFetch;
  });

  test('Button edit é clicavel e funciona', async () => {
    
    const fetchResolved = {
      json: async () => mockPayables,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolved);

    renderWithRouter(<DisplayPayables />);

    const buttonDetail = await screen.findByTestId('edit');
    await userEvent.click(buttonDetail);

    const getModal = screen.getByTestId('close-modal');
    expect(getModal).toBeInTheDocument();

    const labelId = screen.getByText('ID:');
    const labelValue = screen.getByText('Valor:');
    const labelDate = screen.getByText('Data de emissão:');
    const labelAssignor = screen.getByText('Cedente:');
    const buttonSubmit = screen.getByText('Enviar');
    const buttonCacel = screen.getByText('Limpar');

    expect(labelId).toBeInTheDocument();
    expect(labelValue).toBeInTheDocument();
    expect(labelDate).toBeInTheDocument();
    expect(labelAssignor).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonCacel).toBeInTheDocument();

    await userEvent.click(buttonCacel);

    await userEvent.type(screen.getByTestId('id-edit-payable'), '74b862fd-b309-48fb-9862-b6e17ee4e2d2');

    expect(screen.getByTestId('id-edit-payable')).toHaveValue('74b862fd-b309-48fb-9862-b6e17ee4e2d2');

    await userEvent.type(screen.getByTestId('value-edit-payable'), '10000000005');

    expect(screen.getByTestId('value-edit-payable')).toHaveValue(10000000005);

    await userEvent.selectOptions(screen.getByTestId('assignor-edit-payable'), '74b862fd-b309-48fb-9062-b6e17ee4e2d2');

    expect(screen.getByTestId('assignor-edit-payable')).toHaveValue('74b862fd-b309-48fb-9062-b6e17ee4e2d2');
    
    await userEvent.click(getModal);
    expect(getModal).not.toBeInTheDocument();

    return mockFetch;
  });

  test('Button delete é clicavel e funciona', async () => {

    const fetchResolved = {
      json: async () => mockPayables,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolved);

    renderWithRouter(<DisplayPayables />);

    const buttonDelete = await screen.findByTestId('delete');
    await userEvent.click(buttonDelete);
    
    return mockFetch;
  });

  describe('Registrar Pagável', () => {
    test('Deve renderizar o formulário', () => {
      renderWithRouter(<DisplayCreatePayable />);
      const title = screen.getByText('Cadastro de pagáveis');
      expect(title).toBeInTheDocument();
    });
    test('Deve ter os campos corretos', async () => {
      renderWithRouter(<DisplayCreatePayable />);
      const labelId = screen.getByText('ID:');
      const labelValue = screen.getByText('Valor:');
      const labelDate = screen.getByText('Data de emissão:');
      const labelAssignor = screen.getByText('Cedente:');
      const buttonSubmit = screen.getByText('Enviar');
      const buttonCancel = screen.getByText('Limpar');

      expect(labelId).toBeInTheDocument();
      expect(labelValue).toBeInTheDocument();
      expect(labelDate).toBeInTheDocument();
      expect(labelAssignor).toBeInTheDocument();
      expect(buttonSubmit).toBeInTheDocument();
      expect(buttonCancel).toBeInTheDocument();

      const entraceId = await userEvent.type(screen.getByTestId('id-payable'), '74b862fd-b309-48fb--b6e17ee4e2d2');
      const entraceValue = await userEvent.type(screen.getByTestId('value-payable'), '1000000000');

      await userEvent.click(buttonSubmit);
      
      const getWarning = await screen.findByText('ID inválido! Insira um ID válido no formato UUID');

    });
  });
  describe('Registrar Pagável', () => {
    test('Deve ter os campos corretos', async () => {
      renderWithRouter(<DetailsPayables />);
      const getText = screen.getByText('Detalhes do pagável');
      const labelId = screen.getByText('ID');
      const labelValue = screen.getByText('Valor');
      const labelDate = screen.getByText('Data de emissão');
      const labelAssignor = screen.getByText('Cedente');
      const buttonSubmit = screen.getByText('Detalhes do cedente');

      await userEvent.click(buttonSubmit);
      expect(getText).toBeInTheDocument();
      expect(labelId).toBeInTheDocument();
      expect(labelValue).toBeInTheDocument();
      expect(labelDate).toBeInTheDocument();
      expect(labelAssignor).toBeInTheDocument();
      expect(buttonSubmit).toBeInTheDocument();
    });
  });
});
