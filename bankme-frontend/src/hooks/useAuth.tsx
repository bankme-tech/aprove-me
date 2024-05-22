"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { signIn } from "@/services/auth";

interface ContextProps {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext({} as ContextProps);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    const { access_token } = await signIn({ login: username, password });
    localStorage.setItem("token", access_token);
    setToken(access_token);
    setIsAuthenticated(true);
    router.push("/payable");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/auth");
  };

  useEffect(() => {
    setIsLoading(false);
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setIsAuthenticated(true);
      setToken(accessToken);
    } else {
      setIsAuthenticated(false);
      setToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, token }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
