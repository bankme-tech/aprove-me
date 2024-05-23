import { axiosInstance } from "./api";
import { Assignor } from "@/components/assignor-card";

export default async function getAssignors(id: string) {
  const { data } = await axiosInstance.get<Assignor>(`/assignor/${id}`);

  return data;
}
