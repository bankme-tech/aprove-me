import { useContext } from "react";
import { AuthContext } from "./auth.context";

export const useAuth = () => {
  const { isAuth, login, register, error, auth } = useContext(AuthContext);

  return {
    isAuth,
    login,
    register,
    error,
    auth,
  };
};
