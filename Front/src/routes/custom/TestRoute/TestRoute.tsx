import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const TestRoute: React.FC = () => {
  return window.location.hostname === "localhost" ? (
    <Outlet />
  ) : (
    <Navigate to="/off" />
  );
};
