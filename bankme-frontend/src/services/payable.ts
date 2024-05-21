import { api } from "../lib/axios";

export interface Payable {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: string;
}

interface CreatePayableInput {
  value: number;
  emissionDate: string;
  assignorId: string;
}

interface UpdatePayableInput extends CreatePayableInput {
  payableId: string;
}

export async function createPayable(data: CreatePayableInput) {
  const res = await api.post<Payable>("/payable", data);
  return res.data;
}

export async function getAllPayable() {
  const res = await api.get<Payable[]>("/payable");
  return res.data;
}

export async function updatePayable(data: UpdatePayableInput) {
  const res = await api.patch<Payable>(`/payable/${data.payableId}`, {
    value: data.value,
    emissionDate: data.emissionDate,
    assignorId: data.assignorId,
  });
  return res.data;
}

export async function deletePayable(id: string) {
  const res = await api.delete<void>(`/payable/${id}`);
  return res.data;
}
