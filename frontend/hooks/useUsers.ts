import { useQuery } from "@tanstack/react-query";
import getUsers from "@/app/api/getUsers";

export default function useUsers() {
  const { data: users } = useQuery({
    queryFn: async () => await getUsers(),
    queryKey: ["users"],
  });

  return {
    users,
  };
}
