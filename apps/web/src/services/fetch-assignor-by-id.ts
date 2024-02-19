import { useEffect, useState } from 'react';
import { api } from './api';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export type Assignor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
};

export type ApiAssignor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  assignor: ApiAssignor;
};

async function fetchAssignorById(id: string): Promise<Assignor> {
  const {
    data: { assignor },
  } = await api.get<ApiResponse>(`/integrations/assignor/${id}`);

  return {
    id: assignor.id,
    name: assignor.name,
    email: assignor.email,
    phone: assignor.phone,
    document:
      assignor.document.length > 11
        ? cnpj.format(assignor.document)
        : cpf.format(assignor.document),
  };
}

export enum FetchAssignorStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export function useFetchAssignor(id: string) {
  const [status, setStatus] = useState<FetchAssignorStatus>(
    FetchAssignorStatus.LOADING,
  );
  const [data, setData] = useState<Assignor>();

  const fetch = () => {
    fetchAssignorById(id)
      .then((assignor) => {
        setData(assignor);
        setStatus(FetchAssignorStatus.SUCCESS);
      })
      .catch(() => setStatus(FetchAssignorStatus.FAILED));
  };

  const refetch = () => {
    setStatus(FetchAssignorStatus.LOADING);

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
