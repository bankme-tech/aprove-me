/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { BankmeClient } from '@/services/bankme-client/clients/bankme-client';
import { MockAssignorsClient } from '@/services/bankme-client/impl/mocks/mock-assignors-client';
import { MockPayblesClient } from '@/services/bankme-client/impl/mocks/mock-payables-client';

import UpdateAssignorPage from '../page';

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

describe('Update assignor', () => {
  const client = new BankmeClient({
    payables: new MockPayblesClient(),
    assignors: new MockAssignorsClient(),
  });
  it('should not be able to update with empty form', async () => {
    render(
      <ApiContextProvider api={client}>
        <UpdateAssignorPage
          params={{ id: '67971d4d-96de-4de0-81cd-c6aa96e53864' }}
        />
      </ApiContextProvider>,
    );

    await waitFor(() =>
      expect(screen.queryByText('Update assignor')).toBeInTheDocument(),
    );

    const documentInput = screen.getByRole('textbox', { name: /document/i });
    fireEvent.change(documentInput, { target: { value: '' } });

    const updateBtn = screen.getByText('Update');

    fireEvent.click(updateBtn);

    await waitFor(() => {
      expect((documentInput as any).value).toBe('');
    });
  });
  it('should be able to update', async () => {
    render(
      <ApiContextProvider api={client}>
        <UpdateAssignorPage
          params={{ id: '67971d4d-96de-4de0-81cd-c6aa96e53864' }}
        />
      </ApiContextProvider>,
    );

    await waitFor(() =>
      expect(screen.queryByText('Update assignor')).toBeInTheDocument(),
    );

    const documentInput = screen.getByRole('textbox', { name: /document/i });
    fireEvent.change(documentInput, { target: { value: 'document' } });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    fireEvent.change(emailInput, { target: { value: 'johndoe@gmail.com' } });
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    fireEvent.click(nameInput);
    const phoneInput = screen.getByRole('textbox', { name: /phone/i });
    fireEvent.click(phoneInput);

    const createBtn = screen.getByText('Update');
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
