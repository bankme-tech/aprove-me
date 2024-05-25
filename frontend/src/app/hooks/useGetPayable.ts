import { useQuery } from "@tanstack/react-query";

import { api } from "../../api";



const getPayable = async () => await api.get("/integrations/payable");
const useGetPayable = () => {
  const query = useQuery({
    queryFn: getPayable,
    queryKey: ['payables-data'],
    retry: false
  })

  return {...query, data: query.data?.data}
}

export default useGetPayable;