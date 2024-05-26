/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { BankmeClient } from '@/services/bankme-client/clients/bankme-client';
import { MockAuthClient } from '@/services/bankme-client/impl/mocks/mock-auth-client';

import LoginPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('Login', () => {
  const client = new BankmeClient({ auth: new MockAuthClient() });
  it('should not trigger login if no field are filled', async () => {
    render(<LoginPage />);

    const loginBtn = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginBtn);

    await waitFor(() => {
      const loginErrMsg = screen.getByTestId('login-error-message');
      const passwordErrMsg = screen.getByTestId('password-error-message');
      expect(loginErrMsg).toBeInTheDocument();
      expect(passwordErrMsg).toBeInTheDocument();
    });

    expect(loginBtn).toBeInTheDocument();
  });
  it('should not trigger login if only login is filled', async () => {
    render(<LoginPage />);

    const loginInput = screen.getByRole('textbox', { name: /login/i });
    fireEvent.change(loginInput, { target: { value: 'myLoginHere' } });
    const loginBtn = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginBtn);

    await waitFor(() => {
      const loginErrMsg = screen.queryByTestId('login-error-message');
      const passwordErrMsg = screen.getByTestId('password-error-message');
      expect(loginErrMsg).not.toBeInTheDocument();
      expect(passwordErrMsg).toBeInTheDocument();
    });
  });
  it('should not trigger login if only password is filled', async () => {
    render(<LoginPage />);

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'myPasswordHere' } });
    const loginBtn = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginBtn);

    await waitFor(() => {
      const loginErrMsg = screen.getByTestId('login-error-message');
      const passwordErrMsg = screen.queryByTestId('password-error-message');
      expect(loginErrMsg).toBeInTheDocument();
      expect(passwordErrMsg).not.toBeInTheDocument();
    });
  });
  it('should login user when credetions are correct', async () => {
    render(
      <ApiContextProvider api={client}>
        <LoginPage />
      </ApiContextProvider>,
    );
    const loginInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(loginInput, { target: { value: 'myLoginHere' } });
    fireEvent.change(passwordInput, { target: { value: 'myPasswordHere' } });
    const loginBtn = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginBtn);

    await waitFor(() => {
      const loginErrMsg = screen.queryByTestId('login-error-message');
      const passwordErrMsg = screen.queryByTestId('password-error-message');
      expect(loginErrMsg).not.toBeInTheDocument();
      expect(passwordErrMsg).not.toBeInTheDocument();
    });
  });
});
