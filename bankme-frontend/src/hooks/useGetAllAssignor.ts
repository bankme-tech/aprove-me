import { useQuery } from "@tanstack/react-query";
import { getAllAssignor } from "../services/assignor";

export function useGetAllAssignor() {
  return useQuery({
    queryFn: getAllAssignor,
    queryKey: ["get-all-assignor"],
  });
}
