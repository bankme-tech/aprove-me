import { useMutation } from "@tanstack/react-query";

import { api } from "../../api";

type UserLogin = {
  login: string;
  password: string;
};

const logIn = async (user: UserLogin) => await api.post("/integrations/auth", user);
const useLogin = () => useMutation( { mutationFn: (user : UserLogin) => logIn(user) });

export default useLogin;