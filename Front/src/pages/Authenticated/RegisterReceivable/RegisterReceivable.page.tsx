import { TextButton } from "components/Button/TextButton/TextButton";
import { InputGroup } from "components/Input/InputGroup/InputGroup";
import { useNotification } from "contexts/Notification/NotificationContext";
import { useService } from "contexts/Service/ServiceContext";
import { IError } from "interfaces/interfaces/Error/IError";
import { ICreateReceivable } from "interfaces/interfaces/Receivable/ICreateReceivable";
import { LayoutSecurePage } from "layout/Authenticated/LayoutSecurePage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "routes/enum/routes.enum";
import { TextUtils } from "utils/textUtils";

export const RegisterReceivablePage: React.FC = () => {
  const { assignorService, receivableService } = useService();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm();

  const [assignors, setAssignors] = useState<string[]>([]);

  const onSave = async (data: any) => {
    try {
      await receivableService.create(data as ICreateReceivable);
      navigate(RoutesEnum.UserRoute.ViewPayable);
      notify("Recebível salvo com sucesso", "success");
    } catch (err: any) {
      const error: IError = err;
      const customError = TextUtils.getCustomError(error);

      if (customError) {
        notify(customError.message, customError.type);
      } else {
        notify("Erro ao salvar recebível, contate o suporte!", "error");
      }
    }
  };

  const fetch = async () => {
    try {
      const data = await assignorService.getAll();
      setAssignors(data.map(({ email }) => email));
    } catch (err: any) {
      const error: IError = err;
      const customError = TextUtils.getCustomError(error);

      if (customError) {
        notify(customError.message, customError.type);
      } else {
        notify("Erro ao carregar dados, contate o suporte!", "error");
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <LayoutSecurePage hasReturnButton title="Registrar recebível">
      <div className="mt-12 flex flex-col gap-4 px-10">
        <div className="flex w-full justify-end">
          <TextButton
            onClick={() => navigate(RoutesEnum.UserRoute.RegisterAssignor)}
            type="primary"
          >
            Criar cedente
          </TextButton>
        </div>

        <form
          onSubmit={handleSubmit(onSave)}
          className="flex w-full flex-col items-center justify-start gap-4"
        >
          <InputGroup
            control={control}
            errors={errors}
            inputColumn={[
              {
                label: "Novo recebível",
                type: "title"
              },
              {
                label: "Valor",
                name: "value",
                required: true,
                type: "currency"
              },
              {
                label: "Data de emissão",
                name: "emissionDate",
                required: true,
                type: "date"
              },
              {
                label: "Cedente",
                name: "assignorEmail",
                options: assignors,
                placeholder: "Selecione o cedente",
                required: true,
                type: "select"
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
      </div>
    </LayoutSecurePage>
  );
};
