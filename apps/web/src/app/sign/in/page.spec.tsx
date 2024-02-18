import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignInPage from './page';

describe('SignInPage', () => {
  it('should render correctly', async () => {
    render(<SignInPage />);

    expect(screen.getByTestId('login-form')).toBeDefined();
  });
});
