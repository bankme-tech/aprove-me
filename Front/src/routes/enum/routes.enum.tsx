const BaseRoute = {
  Login: "/login",
  SignUp: "/sign-up",
  User: "user",

  ViewPayable: "payable/view",
  RegisterPayable: "payable/register",
  RegisterAssignor: "assignor/register",

  Teste: "teste"
};

const UserRoute = {
  ViewPayable: `/${BaseRoute.User}/${BaseRoute.ViewPayable}`,
  RegisterPayable: `/${BaseRoute.User}/${BaseRoute.RegisterPayable}`,
  RegisterAssignor: `/${BaseRoute.User}/${BaseRoute.RegisterAssignor}`
};

export const RoutesEnum = { BaseRoute, UserRoute };
