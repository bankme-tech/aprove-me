import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../api";

type CreatePayable = {
  value: string;
  emissionDate: Date;
  assignorId: string;
};

const createPayable = async (payable: CreatePayable) =>
  api.post("/integrations/payable", {...payable, value: Number(payable.value)});
const useCreatePayable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payable: CreatePayable) => createPayable(payable),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payables-data"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};

export default useCreatePayable;
