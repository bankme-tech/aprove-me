import { CentralInputCard } from "components/Card/CentralInputCard/CentralInputCard";
import { useAuth } from "contexts/Auth/AuthContext";
import { LayoutUnauthenticatedPage } from "layout/Unauthenticated/LayoutUnauthenticatedPage";
import React from "react";
import { RoutesEnum } from "routes/enum/routes.enum";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <LayoutUnauthenticatedPage>
      <CentralInputCard
        redirectLink={RoutesEnum.BaseRoute.SignUp}
        redirectText="Não tenho cadastro"
        title="Login"
        textActionFormButton="Login"
        inputs={[
          {
            label: "E-mail",
            name: "email",
            type: "email",
            required: true
          },
          {
            label: "Senha",
            name: "password",
            type: "password",
            required: true
          }
        ]}
        onSubmit={(data) => login(data.email, data.password)}
      />
    </LayoutUnauthenticatedPage>
  );
};
