import { useEffect, useState } from 'react';
import { api } from './api';

export type Assignor = {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
};

export type ApiAssignor = {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  assignors: ApiAssignor[];
};

async function fetchAssignorList(): Promise<Assignor[]> {
  const { data } = await api.get<ApiResponse>('/integrations/assignor');

  return data.assignors.map((assignor) => ({
    id: assignor.id,
    document: assignor.document,
    email: assignor.email,
    name: assignor.name,
    phone: assignor.phone,
  }));
}

export enum FetchAssignorListStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export function useFetchAssignorList() {
  const [status, setStatus] = useState<FetchAssignorListStatus>(
    FetchAssignorListStatus.LOADING,
  );
  const [data, setData] = useState<Assignor[]>([]);

  useEffect(() => {
    fetchAssignorList()
      .then((assignors) => {
        setData(assignors);
        setStatus(FetchAssignorListStatus.SUCCESS);
      })
      .catch(() => setStatus(FetchAssignorListStatus.FAILED));
  }, []);

  return {
    data,
    status,
  };
}
