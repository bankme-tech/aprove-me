import { api } from "../lib/axios";

interface Payable {
  id: string;
  value: string;
  emissionDate: string;
  assignorId: string;
}

interface CreatePayableInput {
  value: number;
  emissionDate: string;
  assignorId: string;
}

export async function createPayable(data: CreatePayableInput) {
  const res = await api.post<Payable>("/payable", data);
  return res.data;
}

export async function getAllPayable() {
  const res = await api.get<Payable[]>("/payable");
  return res.data;
}
