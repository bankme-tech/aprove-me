import { RegisterAssignorPage } from "pages/Authenticated/RegisterAssignor/RegisterAssignor.page";
import { RegisterReceivablePage } from "pages/Authenticated/RegisterReceivable/RegisterReceivable.page";
import { ViewReceivablePage } from "pages/Authenticated/ViewPayable/ViewReceivable.page";
import { Navigate } from "react-router-dom";
import { RoutesEnum } from "routes/enum/routes.enum";
import { IRoute } from "routes/interfaces/IRoute";

export const UserSecureRouter: IRoute[] = [
  {
    path: RoutesEnum.BaseRoute.ViewPayable,
    element: <ViewReceivablePage />
  },

  {
    path: RoutesEnum.BaseRoute.RegisterAssignor,
    element: <RegisterAssignorPage />
  },

  {
    path: RoutesEnum.BaseRoute.RegisterPayable,
    element: <RegisterReceivablePage />
  },

  // Redirect
  {
    path: "*",
    element: <Navigate to={RoutesEnum.BaseRoute.ViewPayable} />
  }
];
