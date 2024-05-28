"use client";

import { IUserService } from "@/@core/domain/services/user.service.interface";
import { myContainer } from "@/@core/infra/dependecy-injection/inversify.config";
import { TYPES } from "@/@core/infra/dependecy-injection/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { AuthInputDTO, RegisterInputDTO } from "@/@core/domain/dtos/user.dto";
import { UnauthorizedError } from "@/@core/domain/errors/unauthorized-error";
import { UserAlreadyExistsError } from "@/@core/domain/errors/user-already-exists-error";

const service = myContainer.get<IUserService>(TYPES.IUserService);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      console.log("isAuth", isAuth);
      router.push("/login");
    }
  }, [isAuth, router]);

  const login = async (data: AuthInputDTO) => {
    try {
      const result = await service.login(data);
      setToken(result.token);
      setIsAuth(true);
      router.push("/");
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setError("Usuário ou senha inválidos");
        return;
      }
      throw error;
    }
  };

  const register = async (data: RegisterInputDTO) => {
    try {
      setIsAuth(false);
      const result = await service.register(data);
      if (result) await login(data);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        setError("Já existe um usuário com esse nome");
        return;
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, register, isAuth, error }}>
      {children}
    </AuthContext.Provider>
  );
};
