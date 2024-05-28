import { useContext } from "react";
import { AuthContext } from "./auth.context";

export const useAuth = () => {
  const { token, isAuth, login, register, error } = useContext(AuthContext);

  return {
    token,
    isAuth,
    login,
    register,
    error,
  };
};
