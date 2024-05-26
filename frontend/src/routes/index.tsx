import { createBrowserRouter } from "react-router-dom";
import CreatePayable from "../pages/CreatePayable";
import PayableInfo from "../pages/PayableInfo";
import Layout from "../components/Layout";
import CreateAssignor from "../pages/CreateAssignor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <CreatePayable />,
      },
      {
        path: "/payable",
        element: <PayableInfo />,
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
