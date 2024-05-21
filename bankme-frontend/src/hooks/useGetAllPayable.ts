import { useQuery } from "@tanstack/react-query";
import { getAllPayable } from "../services/payable";

export function useGetAllPayable() {
  return useQuery({
    queryFn: getAllPayable,
    queryKey: ["get-all-payable"],
  });
}
