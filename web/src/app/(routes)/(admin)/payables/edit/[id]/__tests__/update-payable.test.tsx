/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { BankmeClient } from '@/services/bankme-client/clients/bankme-client';
import { MockAssignorsClient } from '@/services/bankme-client/impl/mocks/mock-assignors-client';
import { MockPayblesClient } from '@/services/bankme-client/impl/mocks/mock-payables-client';

import UpdatePayablePage from '../page';

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

describe('Update payable', () => {
  const client = new BankmeClient({
    payables: new MockPayblesClient(),
    assignors: new MockAssignorsClient(),
  });
  it('should not be able to update with empty form', async () => {
    render(
      <ApiContextProvider api={client}>
        <UpdatePayablePage
          params={{ id: '67971d4d-96de-4de0-81cd-c6aa96e53864' }}
        />
      </ApiContextProvider>,
    );

    await waitFor(() =>
      expect(screen.queryByText('Update payable')).toBeInTheDocument(),
    );

    const valueInput = screen.getByRole('textbox', { name: /value/i });
    fireEvent.change(valueInput, { target: { value: 'aa' } });

    const updateBtn = screen.getByText('Update');

    fireEvent.click(updateBtn);

    await waitFor(() => {
      const valueErrMsg = screen.getByTestId('value-error-message');

      expect(valueErrMsg).toBeInTheDocument();
    });
  });
  it('should be able to update', async () => {
    render(
      <ApiContextProvider api={client}>
        <UpdatePayablePage
          params={{ id: '67971d4d-96de-4de0-81cd-c6aa96e53864' }}
        />
      </ApiContextProvider>,
    );

    await waitFor(() =>
      expect(screen.queryByText('Update payable')).toBeInTheDocument(),
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
    const createBtn = screen.getByText('Update');
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
