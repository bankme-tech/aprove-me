import { screen } from '@testing-library/react';
import { Home } from '../src/page/home/home';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Home', () => {
  it('Boas vindas', () => {
    renderWithRouter(<Home />);
    const welcome = screen.getByText('Seja Bem vindo!');
    expect(welcome).toBeInTheDocument();
  });
  it('Imagem logo', () => {
    renderWithRouter(<Home />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });
});