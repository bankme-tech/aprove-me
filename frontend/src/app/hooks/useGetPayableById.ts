import { useQuery } from "@tanstack/react-query";

import { api } from "../../api";

export type Payable = {
  id: string;
  value: string;
  emissionDate: string;
  assignorId: string;
};

const getPayable = async (id: string) =>
  await api.get<Payable>(`/integrations/payable/${id}`);
const useGetPayableById = (id: string) => {
  const query = useQuery({
    queryFn: () => getPayable(id),
    queryKey: ["payable-data"],
    enabled: !!id
  });

  return { ...query, data: query.data?.data };
};

export default useGetPayableById;
