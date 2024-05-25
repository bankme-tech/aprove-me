import { createBrowserRouter } from "react-router-dom";
import CreatePayable from "../pages/CreatePayable";
import PayableInfo from "../pages/PayableInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreatePayable />,
  },
  {
    path: "/payable",
    element: <PayableInfo />,
  },
]);

export default router;
