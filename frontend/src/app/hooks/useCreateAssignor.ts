import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../api";

type CreateAssignor = {
  document: string;
  email: string;
  password: string;
  phone: string;
  name: string;
};

const createAssignor = async (assignor: CreateAssignor) =>
  await api.post("/integrations/assignor", assignor);

const useCreateAssignor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignor: CreateAssignor) => createAssignor(assignor),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assignors-data"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};

export default useCreateAssignor;
