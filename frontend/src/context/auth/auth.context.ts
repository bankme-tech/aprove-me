import { AuthInputDTO } from "@/@core/domain/dtos/user.dto";
import { createContext } from "react";

export type AuthContextType = {
  token: string | null;
  isAuth: boolean;
  login: (data: AuthInputDTO) => Promise<void>;
  register: (data: AuthInputDTO) => Promise<void>;
  error: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuth: false,
  login: async () => {},
  register: async () => {},
  error: null,
});
