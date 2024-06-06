import { useNotification } from "contexts/Notification/NotificationContext";
import { useService } from "contexts/Service/ServiceContext";
import { IError } from "interfaces/interfaces/Error/IError";
import { IUserCredentials } from "interfaces/interfaces/User/IUserCredentials";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { RoutesEnum } from "routes/enum/routes.enum";
import { TextUtils } from "utils/textUtils";

interface IAuthContext {
  login: (email: string, password: string) => Promise<void>;
  user: IUserCredentials;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const { notify } = useNotification();
  const { authService } = useService();

  const [user, setUser] = useState<IUserCredentials>(() => {
    const accessToken = localStorage.getItem("@Project:accessToken");
    const user = localStorage.getItem("@Project:user");

    if (user && accessToken) {
      return {
        accessToken: accessToken,
        user: JSON.parse(user)
      };
    } else {
      return {} as IUserCredentials;
    }
  });

  const login = async (email: string, password: string) => {
    try {
      const { accessToken, user } = await authService.login(email, password);
      notify("Login realizado com sucesso", "success");
      setAccessTokenAndUser({ accessToken, user });
      window.location.assign(RoutesEnum.UserRoute.ViewPayable);
    } catch (err: any) {
      const error: IError = err;
      const customError = TextUtils.getCustomError(error);

      if (customError) {
        customError.map(({ message, type }) => notify(message, type));
      } else {
        notify("Erro no login, email ou senha incorreta", "error");
      }
    }
  };

  const setAccessTokenAndUser = ({ accessToken, user }: IUserCredentials) => {
    localStorage.setItem("@Project:accessToken", accessToken);

    if (accessToken) {
      localStorage.setItem("@Project:user", JSON.stringify(user));
      setUser({
        accessToken,
        user
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
