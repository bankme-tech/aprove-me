import { axiosInstance } from "./api";
import { Assignor } from "@/components/assignor-card";

type Values = {
  name: string;
  email: string;
  phone: string;
  document: string;
};

export default async function createAssignor(values: Values) {
  const { data, status } = await axiosInstance.post<Assignor>("/assignor", values);

  return { data, status };
}
