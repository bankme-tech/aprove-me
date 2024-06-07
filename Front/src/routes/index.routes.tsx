import { TestePage } from "pages/Teste/Teste.page";
import { LoginPage } from "pages/Unauthenticated/Login/Login.page";
import { SignUpPage } from "pages/Unauthenticated/SignUp/SignUp.page";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { SecureRoute } from "./custom/SecureRoute/SecureRoute";
import { TestRoute } from "./custom/TestRoute/TestRoute";
import { RoutesEnum } from "./enum/routes.enum";
import { UserSecureRouter } from "./routes/secure.routes";

export const router = createBrowserRouter([
  // Secure routes
  {
    path: RoutesEnum.BaseRoute.User,
    element: <SecureRoute />,
    children: UserSecureRouter
  },

  // Tests
  {
    element: <TestRoute />,
    children: [
      {
        path: RoutesEnum.BaseRoute.Teste,
        element: <TestePage />
      }
    ]
  },

  // Login
  {
    path: RoutesEnum.BaseRoute.Login,
    element: <LoginPage />
  },

  // Sign-up
  {
    path: RoutesEnum.BaseRoute.SignUp,
    element: <SignUpPage />
  },

  // Redirect
  {
    path: "*",
    element: <Navigate to={RoutesEnum.UserRoute.ViewPayable} />
  },
  {
    path: "/",
    element: <Navigate to={RoutesEnum.UserRoute.ViewPayable} />
  }
]);
