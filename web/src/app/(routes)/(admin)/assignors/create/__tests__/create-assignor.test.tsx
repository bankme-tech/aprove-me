/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { BankmeClient } from '@/services/bankme-client/clients/bankme-client';
import { MockAssignorsClient } from '@/services/bankme-client/impl/mocks/mock-assignors-client';
import { MockPayblesClient } from '@/services/bankme-client/impl/mocks/mock-payables-client';

import CreateAssignorPage from '../page';

let batch: undefined | string;

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
  useSearchParams() {
    return {
      get() {
        return batch;
      },
    };
  },
}));

describe('Create assignor', () => {
  const client = new BankmeClient({
    payables: new MockPayblesClient(),
    assignors: new MockAssignorsClient(),
  });
  it('should not be possible to create with empty form', async () => {
    render(
      <ApiContextProvider api={client}>
        <CreateAssignorPage />
      </ApiContextProvider>,
    );

    const createBtn = screen.getByText('Create');

    fireEvent.click(createBtn);

    await waitFor(() => {
      const documentErrMsg = screen.queryByTestId('document-error-message');
      const emailErrMsg = screen.queryByTestId('email-error-message');
      const nameErrMsg = screen.queryByTestId('name-error-message');
      const phoneErrMsg = screen.queryByTestId('phone-error-message');
      expect(documentErrMsg).toBeInTheDocument();
      expect(emailErrMsg).toBeInTheDocument();
      expect(nameErrMsg).toBeInTheDocument();
      expect(phoneErrMsg).toBeInTheDocument();
    });
  });
  it('should be able to create', async () => {
    render(
      <ApiContextProvider api={client}>
        <CreateAssignorPage />
      </ApiContextProvider>,
    );

    const valueInput = screen.getByRole('textbox', { name: /document/i });
    fireEvent.change(valueInput, { target: { value: 'document' } });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    fireEvent.change(emailInput, { target: { value: 'johndoe@gmail.com' } });
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    fireEvent.change(nameInput, { target: { value: 'johndoe' } });
    const phoneInput = screen.getByRole('textbox', { name: /phone/i });
    fireEvent.change(phoneInput, { target: { value: '9999' } });

    const createBtn = screen.getByText('Create');
    fireEvent.click(createBtn);
    const documentErrMsg = screen.queryByTestId('document-error-message');
    const emailErrMsg = screen.queryByTestId('email-error-message');
    const nameErrMsg = screen.queryByTestId('name-error-message');
    const phoneErrMsg = screen.queryByTestId('phone-error-message');
    expect(documentErrMsg).toBeNull();
    expect(emailErrMsg).toBeNull();
    expect(nameErrMsg).toBeNull();
    expect(phoneErrMsg).toBeNull();
  });
});
