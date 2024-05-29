import { AuthInputDTO } from "@/@core/domain/dtos/user.dto";
import { createContext } from "react";

export type AuthContextType = {
  isAuth: boolean;
  login: (data: AuthInputDTO) => Promise<void>;
  register: (data: AuthInputDTO) => Promise<void>;
  error: string | null;
  auth: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  login: async () => {},
  register: async () => {},
  error: null,
  auth: () => {},
});
