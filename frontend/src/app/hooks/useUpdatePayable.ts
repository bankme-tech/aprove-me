import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../api";

export type CreatePayable = {
  value: string;
  emissionDate: Date;
  assignorId: string;
};

const updatePayable = async ({ id, payable }: {id: string, payable: CreatePayable}) =>
  await api.patch(`/integrations/payable/${id}`, {...payable, value: Number(payable.value)});
const useUpdatePayable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePayable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payables-data"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};

export default useUpdatePayable;
