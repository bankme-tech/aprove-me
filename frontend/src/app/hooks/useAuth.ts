import { useContext } from "react";
import { AuthContext } from "../contexts";

export function useAuth() {
  return useContext(AuthContext)
}
