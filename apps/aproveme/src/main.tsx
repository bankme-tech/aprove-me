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
import { AuthProvider } from "./lib/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateAssignor from "./pages/CreateAssignor";

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
      <ProtectedRoute>
        <Layout>
          <PayableListPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/payable/create",
    element: (
      <ProtectedRoute>
        <Layout>
          <CreatePayable />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/payable/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <PayableInfoPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/assignor/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <AssignorInfoPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/assignor/create",
    element: (
      <ProtectedRoute>
        <Layout>
          <CreateAssignor />
        </Layout>
      </ProtectedRoute>
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
