import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterPage from "./pages/Register";
import PayableListPage from "./pages/PayableList";
import CreatePayable from "./pages/CreatePayable";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import PayableInfoPage from "./pages/PayableInfo";
import "./index.css";
import AssignorInfoPage from "./pages/AssignorInfo";
import { AuthProvider } from "./lib/context/AuthProvider";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/payable",
    element: (
      <Layout>
        <PayableListPage />
      </Layout>
    ),
  },
  {
    path: "/payable/create",
    element: (
      <Layout>
        <CreatePayable />
      </Layout>
    ),
  },
  {
    path: "/payable/:id",
    element: (
      <Layout>
        <PayableInfoPage />
      </Layout>
    ),
  },
  {
    path: "/assignor/:id",
    element: (
      <Layout>
        <AssignorInfoPage />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/payable" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
