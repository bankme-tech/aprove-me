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
  const res = await api.post<Assignor>("/assignor", data);
  return res.data;
}

interface UpdateAssignorInput extends Partial<Assignor> {}

export async function updateAssignor(data: UpdateAssignorInput) {
  const res = await api.patch<Assignor>(`/assignor/${data.id}`, {
    name: data.name,
    email: data.email,
    phone: data.phone,
    document: data.document,
  });
  return res.data;
}

export async function deleteAssignor(id: string) {
  const res = await api.delete<void>(`/assignor/${id}`);
  return res.data;
}
