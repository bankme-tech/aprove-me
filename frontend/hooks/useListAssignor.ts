import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useListAssignor() {
  const { data } = useQuery({
    queryKey: ["assignors"],
    queryFn: async () => {
      const response = await api.get("/integrations/assignor/all");
      return response.data;
    },
  });

  return {
    assignors: data,
  };
}
