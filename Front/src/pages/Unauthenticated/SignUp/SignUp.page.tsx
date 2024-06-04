import { CentralInputCard } from "components/Card/CentralInputCard/CentralInputCard";
import { useNotification } from "contexts/Notification/NotificationContext";
import { useService } from "contexts/Service/ServiceContext";
import { IError } from "interfaces/interfaces/Error/IError";
import { LayoutUnauthenticatedPage } from "layout/Unauthenticated/LayoutUnauthenticatedPage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "routes/enum/routes.enum";
import { TextUtils } from "utils/textUtils";

export const SignUpPage: React.FC = () => {
  const { userService } = useService();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const signUp = async (data: any) => {
    try {
      await userService.register(data.email, data.password);
      notify("Cadastro realizado com sucesso", "success");
      navigate(RoutesEnum.BaseRoute.Login);
    } catch (err: any) {
      const error: IError = err;
      const customError = TextUtils.getCustomError(error);

      if (customError) {
        notify(customError.message, customError.type);
      } else {
        notify("Erro ao cadastrar, contate o suporte!", "error");
      }
    }
  };

  return (
    <LayoutUnauthenticatedPage>
      <CentralInputCard
        redirectLink={RoutesEnum.BaseRoute.Login}
        redirectText="Já sou cadastrado, voltar ao login"
        title="Cadastro"
        textActionFormButton="Salvar"
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
        onSubmit={signUp}
      />
    </LayoutUnauthenticatedPage>
  );
};
