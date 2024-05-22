import { Payable } from "@/components/payable-card";
import { axiosInstance } from "./api";

type Values = {
  value: number;
  assignorId: string;
}

export default async function createPayables(values: Values) {
  const { data, status } = await axiosInstance.post<Payable>("/payable", values);

  return { data, status };
}
