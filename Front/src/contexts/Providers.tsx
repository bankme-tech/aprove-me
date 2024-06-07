import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "routes/index.routes";
import { AuthProvider } from "./Auth/AuthContext";
import { NotificationProvider } from "./Notification/NotificationContext";
import { ServiceProvider } from "./Service/ServiceContext";

export const Providers: React.FC = () => (
  <ServiceProvider>
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  </ServiceProvider>
);
