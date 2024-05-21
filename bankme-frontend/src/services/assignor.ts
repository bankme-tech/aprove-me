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

interface CreateAssignorInput extends Omit<Assignor, "id"> {}

export async function createAssignor(data: CreateAssignorInput) {
  const res = await api.post("/assignor", data);
  return res.data;
}
