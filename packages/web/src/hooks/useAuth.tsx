"use client";

import axios from "@/api/api";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoading: boolean;
  isLogged: boolean;
  updateSessionToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers["authorization"] = `Bearer ${token}`;
      setToken(token);
    }

    setIsLoading(false);
  }, []);

  const updateSessionToken = (token: string) => {
    axios.defaults.headers["authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    setToken(token);
  };

  const isLogged = !!token;

  return <AuthContext.Provider value={{ isLoading, isLogged, updateSessionToken }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
