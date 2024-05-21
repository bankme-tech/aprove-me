import { axiosInstance } from "./api";
import { Assignor } from "@/components/assignor-card";

export default async function getAssignors() {
  const { data } = await axiosInstance.get<Assignor[]>("/assignor");

  return data;
}
