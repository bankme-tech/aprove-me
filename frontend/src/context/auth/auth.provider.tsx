/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { IUserService } from "@/@core/domain/services/user.service.interface";
import { myContainer } from "@/@core/infra/dependecy-injection/inversify.config";
import { TYPES } from "@/@core/infra/dependecy-injection/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthContext } from "./auth.context";
import { AuthInputDTO, RegisterInputDTO } from "@/@core/domain/dtos/user.dto";
import { UnauthorizedError } from "@/@core/domain/errors/unauthorized-error";
import { UserAlreadyExistsError } from "@/@core/domain/errors/user-already-exists-error";

const service = myContainer.get<IUserService>(TYPES.IUserService);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const auth = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const { exp } = service.decodeToken(token);
      const now = Date.now() / 1000;
      if (now < exp) {
        setIsAuth(true);
        return;
      }
    }
    setIsAuth(false);
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  const login = async (data: AuthInputDTO) => {
    try {
      const { token } = await service.login(data);
      localStorage.setItem("accessToken", token);
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
    <AuthContext.Provider value={{ login, register, isAuth, error, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
