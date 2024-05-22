"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { signIn } from "@/services/auth";

interface ContextProps {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>
  logout: () => void;
}

const AuthContext = createContext({} as ContextProps);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!token;
  const router = useRouter();

  const login = async (username: string, password: string) => {
    const { access_token } = await signIn({ login: username, password });
    localStorage.setItem("token", access_token);
    setToken(access_token);
    router.push("/payable");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/auth");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setToken(accessToken);
    } else {
      setToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
