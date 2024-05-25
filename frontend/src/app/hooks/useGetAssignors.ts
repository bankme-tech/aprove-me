import { useQuery } from "@tanstack/react-query";

import { api } from "../../api";

type Assignors = {
    id: string;
    document: string;
    email: string;
    phone: string;
    name: string;
  };


const getAssignors = async () => {
  return (await api.get<Assignors[]>("/integrations/assignor"));
};
const useGetAssignors = () => {

    const query = useQuery({
        queryFn: getAssignors,
        queryKey: ["assignors-data"],
        retry: false
      });

  return {...query, data: query.data?.data}
};

export default useGetAssignors;
