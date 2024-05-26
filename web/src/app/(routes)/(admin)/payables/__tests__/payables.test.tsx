/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { BankmeClient } from '@/services/bankme-client/clients/bankme-client';
import { MockPayblesClient } from '@/services/bankme-client/impl/mocks/mock-payables-client';

import PayablesPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('Payables', () => {
  const client = new BankmeClient({ payables: new MockPayblesClient() });
  it('should render payables in a table', async () => {
    render(
      <ApiContextProvider api={client}>
        <PayablesPage />
      </ApiContextProvider>,
    );

    const { payables } = await client.payables.findAll();
    const rows = screen.findAllByRole('row');
    expect((await rows).length).toBe(payables.length + 1);
  });
  it('should be possible to delete a payable', async () => {
    render(
      <ApiContextProvider api={client}>
        <PayablesPage />
      </ApiContextProvider>,
    );
    await waitFor(() =>
      expect(screen.queryByText('Payables')).toBeInTheDocument(),
    );

    const { payables } = await client.payables.findAll();

    if (payables.length > 0) {
      const firstElemDeleteModalBtn = screen.getByTestId(
        `modal-trigger-${payables[0].id}`,
      );

      fireEvent.click(firstElemDeleteModalBtn);

      const deleteBtn = screen.getByTestId(`delete-trigger-${payables[0].id}`);

      fireEvent.click(deleteBtn);
    }
  });
});
