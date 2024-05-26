/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { BankmeClient } from '@/services/bankme-client/clients/bankme-client';
import { MockAuthClient } from '@/services/bankme-client/impl/mocks/mock-auth-client';

import RegisterPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('Register', () => {
  const client = new BankmeClient({ auth: new MockAuthClient() });
  it('should not trigger register if no field are filled', async () => {
    render(<RegisterPage />);

    const registerBtn = screen.getByRole('button', { name: /register/i });

    fireEvent.click(registerBtn);

    await waitFor(() => {
      const registerErrMsg = screen.getByTestId('register-error-message');
      const passwordErrMsg = screen.getByTestId('password-error-message');
      expect(registerErrMsg).toBeInTheDocument();
      expect(passwordErrMsg).toBeInTheDocument();
    });

    expect(registerBtn).toBeInTheDocument();
  });
  it('should not trigger register if only login is filled', async () => {
    render(<RegisterPage />);

    const loginInput = screen.getByRole('textbox', { name: /login/i });
    fireEvent.change(loginInput, { target: { value: 'myLoginHere' } });
    const registerBtn = screen.getByRole('button', { name: /register/i });

    fireEvent.click(registerBtn);

    await waitFor(() => {
      const registerErrMsg = screen.queryByTestId('register-error-message');
      const passwordErrMsg = screen.getByTestId('password-error-message');
      expect(registerErrMsg).not.toBeInTheDocument();
      expect(passwordErrMsg).toBeInTheDocument();
    });
  });
  it('should not trigger register if only password is filled', async () => {
    render(<RegisterPage />);

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'myPasswordHere' } });
    const registerBtn = screen.getByRole('button', { name: /register/i });

    fireEvent.click(registerBtn);

    await waitFor(() => {
      const registerErrMsg = screen.getByTestId('register-error-message');
      const passwordErrMsg = screen.queryByTestId('password-error-message');
      expect(registerErrMsg).toBeInTheDocument();
      expect(passwordErrMsg).not.toBeInTheDocument();
    });
  });
  it('should register user when credetions are correct', async () => {
    render(
      <ApiContextProvider api={client}>
        <RegisterPage />
      </ApiContextProvider>,
    );
    const registerInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(registerInput, { target: { value: 'myLoginHere' } });
    fireEvent.change(passwordInput, { target: { value: 'myPasswordHere' } });
    const registerBtn = screen.getByRole('button', { name: /register/i });

    fireEvent.click(registerBtn);

    await waitFor(() => {
      const registerErrMsg = screen.queryByTestId('register-error-message');
      const passwordErrMsg = screen.queryByTestId('password-error-message');
      expect(registerErrMsg).not.toBeInTheDocument();
      expect(passwordErrMsg).not.toBeInTheDocument();
    });
  });
});
