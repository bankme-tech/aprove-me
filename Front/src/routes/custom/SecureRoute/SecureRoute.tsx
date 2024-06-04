import { useAuth } from "contexts/Auth/AuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RoutesEnum } from "routes/enum/routes.enum";

export const SecureRoute: React.FC = () => {
  const {
    user: { accessToken }
  } = useAuth();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={RoutesEnum.BaseRoute.Login} />
  );
};
