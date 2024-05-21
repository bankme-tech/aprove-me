import { useQuery } from "@tanstack/react-query";
import { getAssignorById } from "@/services/assignor";

export function useGetAssignorById(id: string) {
  return useQuery({
    queryFn: () => getAssignorById(id),
    queryKey: ["get-assignor-by-id", id],
    enabled: id ? true : false,
  });
}
