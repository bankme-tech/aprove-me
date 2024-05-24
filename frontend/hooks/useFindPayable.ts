import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { fetchHeaders } from "@/utils";

export function useFindPayable(id: string) {
  const { data } = useQuery({
    queryKey: ["payable"],
    queryFn: async () => {
      const response = await api.get(`/integrations/payable/${id}`,{
        headers: fetchHeaders(),
      });
      return response.data;
    },
  });

  return {
    payable: data,
  };
}
