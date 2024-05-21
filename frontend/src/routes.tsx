import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/login/login";
import { Signup } from "@/pages/signup/signup";
import { Payables } from "@/pages/payables/payables";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/payables",
    element: <Payables />,
  },
]);
