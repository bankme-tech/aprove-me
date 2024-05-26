/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { BankmeClient } from '@/services/bankme-client/clients/bankme-client';
import { MockAssignorsClient } from '@/services/bankme-client/impl/mocks/mock-assignors-client';

import AssignorsPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('Payables', () => {
  const client = new BankmeClient({ assignors: new MockAssignorsClient() });
  it('should render payables in a table', async () => {
    render(
      <ApiContextProvider api={client}>
        <AssignorsPage />
      </ApiContextProvider>,
    );

    const { assignors } = await client.assignors.findAll();
    const rows = screen.findAllByRole('row');
    expect((await rows).length).toBe(assignors.length + 1);
  });
  it('should be possible to delete a assignor', async () => {
    render(
      <ApiContextProvider api={client}>
        <AssignorsPage />
      </ApiContextProvider>,
    );
    await waitFor(() =>
      expect(screen.queryByText('Assignors')).toBeInTheDocument(),
    );

    const { assignors } = await client.assignors.findAll();

    if (assignors.length > 0) {
      const firstElemDeleteModalBtn = screen.getByTestId(
        `modal-trigger-${assignors[0].id}`,
      );

      fireEvent.click(firstElemDeleteModalBtn);

      const deleteBtn = screen.getByTestId(`delete-trigger-${assignors[0].id}`);

      fireEvent.click(deleteBtn);
    }
  });
});
