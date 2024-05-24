import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { fetchHeaders } from "@/utils";

export function useListPayable() {
  const { data } = useQuery({
    queryKey: ["payables"],
    queryFn: async () => {
      const response = await api.get("/integrations/payable/all",{
        headers: fetchHeaders(),
      });
      return response.data;
    },
  });

  return {
    payables: data,
  };
}
