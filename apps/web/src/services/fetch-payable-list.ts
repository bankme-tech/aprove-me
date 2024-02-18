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
  payables: ApiPayable[];
};

async function fetchPayableList(): Promise<Payable[]> {
  const { data } = await api.get<ApiResponse>('/integrations/payable');

  return data.payables.map((payable) => ({
    id: payable.id,
    assignorId: payable.assignorId,
    emissionDate: new Date(payable.emissionDate),
    value: payable.value,
  }));
}

export enum FetchPayableListStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export function useFetchPayableList() {
  const [status, setStatus] = useState<FetchPayableListStatus>(
    FetchPayableListStatus.LOADING,
  );
  const [data, setData] = useState<Payable[]>([]);

  useEffect(() => {
    fetchPayableList()
      .then((payables) => {
        setData(payables);
        setStatus(FetchPayableListStatus.SUCCESS);
      })
      .catch(() => setStatus(FetchPayableListStatus.FAILED));
  }, []);

  return {
    data,
    status,
  };
}
