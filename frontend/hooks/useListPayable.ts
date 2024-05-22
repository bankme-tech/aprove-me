import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useListPayable() {
  const { data } = useQuery({
    queryKey: ["payables"],
    queryFn: async () => {
      const response = await api.get("/integrations/payable/all");
      return response.data;
    },
  });

  return {
    payables: data,
  };
}
