import { screen } from '@testing-library/react';
import { Layout } from '../src/components/layout/outlet';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('OutLet', () => {
  it('Deve renderizar', () => {
    renderWithRouter(<Layout />);

    const getTestById = screen.getByTestId('outlet');

    expect(getTestById).toBeInTheDocument();
  });
});
