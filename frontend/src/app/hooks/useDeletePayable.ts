import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../api";

export type CreatePayable = {
  value: string;
  emissionDate: string;
  assignorId: string;
};

const deletePayable = async (id: string) => await api.delete(`/integrations/payable/${id}`);
const useDeletePayable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePayable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payables-data"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};

export default useDeletePayable;