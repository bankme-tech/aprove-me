import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import CreateOrUpdatePayable from "../pages/CreateOrUpdatePayable";
import PayableInfo from "../pages/PayableInfo";
import Layout from "../components/Layout";
import CreateAssignor from "../pages/CreateAssignor";
import PayableList from "../pages/PayableList";
import Login from "../pages/Login";

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLogged = !!localStorage.getItem("token");

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return isLogged ? <>{children}</> : <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <PayableList />,
      },
      {
        path: "/payable/:id/edit",
        element: <CreateOrUpdatePayable />,
      },
      {
        path: "/payable/:id",
        element: <PayableInfo />,
      },
      {
        path: "/payable/new",
        element: <CreateOrUpdatePayable />,
      },
      {
        path: "/assignor/new",
        element: <CreateAssignor />,
      },
      {
        path: "/assignor",
        element: <CreateAssignor />,
      },
    ],
  },
]);

export default router;
