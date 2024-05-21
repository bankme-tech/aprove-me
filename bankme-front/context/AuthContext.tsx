'use client';

import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: any) => {
    const [isLogged, setIsLogged] = useState(false);

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};