import { TextButton } from "components/Button/TextButton/TextButton";
import { InputGroup } from "components/Input/InputGroup/InputGroup";
import { useNotification } from "contexts/Notification/NotificationContext";
import { useService } from "contexts/Service/ServiceContext";
import { ICreateAssignor } from "interfaces/interfaces/Assignor/ICreateAssignor";
import { IError } from "interfaces/interfaces/Error/IError";
import { LayoutSecurePage } from "layout/Authenticated/LayoutSecurePage";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "routes/enum/routes.enum";
import { TextUtils } from "utils/textUtils";

export const RegisterAssignorPage: React.FC = () => {
  const { assignorService } = useService();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm();

  const onSave = async (data: any) => {
    try {
      await assignorService.create(data as ICreateAssignor);
      navigate(RoutesEnum.UserRoute.RegisterPayable);
      notify("Cedente salvo com sucesso", "success");
    } catch (err: any) {
      const error: IError = err;
      const customError = TextUtils.getCustomError(error);

      if (customError) {
        notify(customError.message, customError.type);
      } else {
        notify("Erro ao salvar cedente, contate o suporte!", "error");
      }
    }
  };

  return (
    <LayoutSecurePage hasReturnButton title="Registrar cedente">
      <form
        onSubmit={handleSubmit(onSave)}
        className="flex w-full flex-col items-center justify-start gap-4"
      >
        <InputGroup
          control={control}
          errors={errors}
          inputColumn={[
            {
              label: "Novo cedente",
              type: "title"
            },
            {
              label: "Nome",
              name: "name",
              placeholder: "Digite o nome...",
              required: true,
              type: "text"
            },
            {
              label: "Documento",
              name: "document",
              placeholder: "Digite o documento...",
              required: true,
              type: "text"
            },
            {
              label: "Celular",
              name: "phone",
              maskType: "cellphone",
              placeholder: "Digite o celular...",
              required: true,
              type: "mask"
            },
            {
              label: "Email",
              name: "email",
              placeholder: "Digite o email...",
              required: true,
              type: "email"
            }
          ]}
        />

        <TextButton
          actionType="submit"
          isLoading={isSubmitting}
          onClick={() => undefined}
        >
          Salvar
        </TextButton>
      </form>
    </LayoutSecurePage>
  );
};
