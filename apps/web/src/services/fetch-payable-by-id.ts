import { useEffect, useState } from 'react';
import { api } from './api';

export type Payable = {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
};

export type ApiPayable = {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: string;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  payable: ApiPayable;
};

async function fetchPayableById(id: string): Promise<Payable> {
  const {
    data: { payable },
  } = await api.get<ApiResponse>(`/integrations/payable/${id}`);

  return {
    id: payable.id,
    assignorId: payable.assignorId,
    emissionDate: new Date(payable.emissionDate),
    value: payable.value,
  };
}

export enum FetchPayableStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export function useFetchPayable(id: string) {
  const [status, setStatus] = useState<FetchPayableStatus>(
    FetchPayableStatus.LOADING,
  );
  const [data, setData] = useState<Payable>();

  useEffect(() => {
    if (!id) return;

    fetchPayableById(id)
      .then((payable) => {
        setData(payable);
        setStatus(FetchPayableStatus.SUCCESS);
      })
      .catch(() => setStatus(FetchPayableStatus.FAILED));
  }, [id]);

  return {
    data,
    status,
  };
}
