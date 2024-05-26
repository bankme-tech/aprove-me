/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { BankmeClient } from '@/services/bankme-client/clients/bankme-client';
import { MockAssignorsClient } from '@/services/bankme-client/impl/mocks/mock-assignors-client';
import { MockPayblesClient } from '@/services/bankme-client/impl/mocks/mock-payables-client';

import CreatePayablesPage from '../page';

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

describe('Create payable', () => {
  const client = new BankmeClient({
    payables: new MockPayblesClient(),
    assignors: new MockAssignorsClient(),
  });
  it('should not be possible to create with empty form', async () => {
    render(
      <ApiContextProvider api={client}>
        <CreatePayablesPage />
      </ApiContextProvider>,
    );

    const createBtn = screen.getByText('Create');

    fireEvent.click(createBtn);

    await waitFor(() => {
      const valueErrMsg = screen.getByTestId('value-error-message');
      const emissionDateErrMsg = screen.getByTestId(
        'emissionDate-error-message',
      );
      const assignorErrMsg = screen.getByTestId('assignor-error-message');
      expect(valueErrMsg).toBeInTheDocument();
      expect(emissionDateErrMsg).toBeInTheDocument();
      expect(assignorErrMsg).toBeInTheDocument();
    });
  });
  it('should be able to create', async () => {
    render(
      <ApiContextProvider api={client}>
        <CreatePayablesPage />
      </ApiContextProvider>,
    );

    const valueInput = screen.getByRole('textbox', { name: /value/i });
    fireEvent.change(valueInput, { target: { value: '10000' } });
    const emissionDateInput = screen.getByPlaceholderText('Type here date');
    fireEvent.change(emissionDateInput, { target: { value: '2021-03-03' } });
    const assignorInput = screen.getByTestId('trigger-assignor-modal');
    fireEvent.click(assignorInput);
    const { assignors } = await client.assignors.findAll();
    await waitFor(() =>
      expect(screen.queryByText('Hello!')).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.queryByText(assignors[0].name)).toBeInTheDocument(),
    );
    const optionFirstAssignor = screen.getByTestId(assignors[0].id);
    fireEvent.click(optionFirstAssignor);
    const confirmAssignor = screen.getByText('Confirm');
    fireEvent.click(confirmAssignor);
    const createBtn = screen.getByText('Create');
    fireEvent.click(createBtn);
    const valueErrMsg = screen.queryByTestId('value-error-message');
    const emissionDateErrMsg = screen.queryByTestId(
      'emissionDate-error-message',
    );
    const assignorErrMsg = screen.queryByTestId('assignor-error-message');
    expect(valueErrMsg).toBeNull();
    expect(emissionDateErrMsg).toBeNull();
    expect(assignorErrMsg).toBeNull();
  });
});
