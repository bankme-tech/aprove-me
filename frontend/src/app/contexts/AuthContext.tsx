import { createContext, useCallback, useEffect, useState } from "react";
import cookie from "js-cookie";
import { cookieKeys } from "../config/cookieKeys";
import { toast } from "react-hot-toast";
import { AuthContextValue } from "./interfaces/auth-context-value";

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = cookie.get(cookieKeys.ACCESS_TOKEN);
    return !!storedAccessToken;
  });

  const signin = useCallback((accessToken: string) => {
    cookie.set(cookieKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    cookie.remove(cookieKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  useEffect(() => {
    const storedAccessToken = cookie.get(cookieKeys.ACCESS_TOKEN);
    if (!storedAccessToken) {
      toast.error("Sessão expirada!");
      signout();
    }
  }, [signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
