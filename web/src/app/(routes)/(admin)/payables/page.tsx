'use client';

import dayjs from 'dayjs';
import { Pen, Trash } from 'lucide-react';
import type { NextPage } from 'next';
import React from 'react';
import { toast } from 'sonner';

import { useAPI } from '@/hooks/useAPI';
import type { PayableModel } from '@/services/models/payable-model';

export const PayablesListPage: NextPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [payables, setPayables] = React.useState<PayableModel[]>([]);

  const { api } = useAPI();

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 10000); // 10000 milissegundos equivalem a 10 segundos
        });
        const data = await api.payables.findAll();
        setPayables(data.payables);
      } catch (error) {
        toast.error('An error occured while trying to fetch payables');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [api.payables]);

  if (isLoading) {
    return (
      <main className="flex min-h-content flex-col items-center justify-center px-4 pt-20">
        <span className="loading loading-spinner" />
      </main>
    );
  }

  return (
    <main className="flex min-h-content flex-col items-center px-4 pt-20">
      <div className="w-full max-w-7xl overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Value</th>
              <th>Emission date</th>
              <th>Assignor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payables.map((p, idx) => (
              <tr key={p.id}>
                <th>{idx + 1}</th>
                <td>{p.value}</td>
                <td>{dayjs(p.emissionDate).format('DD/MM/YYYY')}</td>
                <td>{p.assignor}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-error btn-sm">
                      <Trash size={18} />
                    </button>
                    <button className="btn btn-primary btn-sm">
                      <Pen size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PayablesListPage;
