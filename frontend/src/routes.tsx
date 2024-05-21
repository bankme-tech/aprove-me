import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Signup } from "./pages/signup/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
