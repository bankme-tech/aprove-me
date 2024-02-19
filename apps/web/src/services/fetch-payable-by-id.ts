import { useEffect, useState } from 'react';
import { api } from './api';

export type Payable = {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
  assignorName: string;
};

export type ApiPayable = {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: string;
  assignor: {
    name: string;
  };
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
    assignorName: payable.assignor.name,
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

  const fetch = () => {
    fetchPayableById(id)
      .then((payable) => {
        setData(payable);
        setStatus(FetchPayableStatus.SUCCESS);
      })
      .catch(() => setStatus(FetchPayableStatus.FAILED));
  };

  const refetch = () => {
    setStatus(FetchPayableStatus.LOADING);

    fetch();
  };

  useEffect(() => {
    if (!id) return;

    fetch();
  }, [id]);

  return {
    data,
    status,
    refetch,
  };
}
