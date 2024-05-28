import { screen } from '@testing-library/react';
import { HeaderComponent } from '../src/components/header/header';
import { renderWithRouter } from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Header', () => {

  it('Renderizado', () => {
    renderWithRouter(<HeaderComponent />);
    const getheader = screen.getByTestId('header');
    expect(getheader).toBeInTheDocument();
  });
  it('Botão logout', () => {
    renderWithRouter(<HeaderComponent />);
    const getLogout = screen.getByText('Deslogar');
    expect(getLogout).toBeInTheDocument();
  });
  it('Aviso de logado', () => {
    renderWithRouter(<HeaderComponent />);
    const getLogTime = screen.getByTestId('log-time');
    expect(getLogTime).toBeInTheDocument();
  })
  it('Exibi ID do usuário', () => {
    renderWithRouter(<HeaderComponent />);
    const getId = screen.getByText('ID:');
    expect(getId).toBeInTheDocument();
  });
  it('Redenriza navbar', () => {
    renderWithRouter(<HeaderComponent />);
    const getNavbar = screen.getByRole('navigation');
    expect(getNavbar).toBeInTheDocument();
  });
  it('A navbar contém 5 links', () => {
    renderWithRouter(<HeaderComponent />);
    const getLinks = screen.getAllByRole('link');
    expect(getLinks).toHaveLength(5);
  });
  it('É possivél deslogar', async () => {
    renderWithRouter(<HeaderComponent />);
    const getLogout = screen.getByText('Deslogar');
    await userEvent.click(getLogout);
    const getLogout2 = screen.getByText('Deslogando');
    expect(getLogout2).toBeInTheDocument();
  });
});