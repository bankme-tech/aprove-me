import { api } from "@/lib/axios";

export interface Assignor {
  id: string;
  name: string;
  email: string;
  document: string;
  phone: string;
}

export async function getAllAssignor() {
  const res = await api.get<Assignor[]>("/assignor");
  return res.data;
}

export async function getAssignorById(id: string) {
  const res = await api.get<Assignor>(`/assignor/${id}`);
  return res.data;
}
