import { createBrowserRouter } from "react-router-dom";
import CreateOrUpdatePayable from "../pages/CreateOrUpdatePayable";
import PayableInfo from "../pages/PayableInfo";
import Layout from "../components/Layout";
import CreateAssignor from "../pages/CreateAssignor";
import PayableList from "../pages/PayableList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
