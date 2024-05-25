import { useQuery } from "@tanstack/react-query";

import { api } from "../../api";

type Assignors = {
    id: string;
    document: string;
    email: string;
    phone: string;
    name: string;
    payables: []
  };


const getAssignors = async (id: string) => {
  return (await api.get<Assignors>(`/integrations/assignor/${id}`));
};
const useGetAssignorsByid = (id: string) => {

    const query = useQuery({
        queryFn: () => getAssignors(id),
        queryKey: ["assignor-data"],
        enabled: !!id
        
      });

  return {...query, data: query.data?.data}
};

export default useGetAssignorsByid;