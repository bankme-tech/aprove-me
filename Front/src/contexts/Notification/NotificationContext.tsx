import { NotificationType } from "interfaces/interfaces/Global/NotificationType";
import React, { ReactNode, createContext, useContext } from "react";
import { Slide, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NotificationContextData {
  notify: (message: string, type?: NotificationType) => void;
}
export const NotificationContext =
  createContext<NotificationContextData | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const notify = (message: string, type?: NotificationType) => {
    const notificationGenericProps: ToastOptions<object> = {
      position: "top-right",
      autoClose: 6000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      transition: Slide,
      closeButton: true,
      toastId: `${message}${type}`,
      role: "alert"
    };

    type
      ? toast[type](message, notificationGenericProps)
      : toast(message, notificationGenericProps);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer
        limit={8}
        style={{ width: "22.5rem" }}
        className="tag-h3"
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === null) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};
