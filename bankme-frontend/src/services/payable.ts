import { api } from "../lib/axios";

interface CreatePayableInput {
  value: number;
  emissionDate: string;
  assignorId: string;
}

interface CreatePayableOutput extends CreatePayableInput {
  id: string;
}

export async function createPayable(data: CreatePayableInput) {
  const res = await api.post<CreatePayableOutput>("/payable", data);
  return res.data;
}
