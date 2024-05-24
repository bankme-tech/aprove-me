import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { fetchHeaders } from "@/utils";

export function useFindAssignor(id: string) {
  const { data } = useQuery({
    queryKey: ["assignor"],
    queryFn: async () => {
      const response = await api.get(`/integrations/assignor/${id}`,
      { headers: fetchHeaders() });
      return response.data;
    },
  });

  return {
    assignor: data,
  };
}
