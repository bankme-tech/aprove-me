import { TextButton } from "components/Button/TextButton/TextButton";
import { useNotification } from "contexts/Notification/NotificationContext";
import { useService } from "contexts/Service/ServiceContext";
import { IError } from "interfaces/interfaces/Error/IError";
import { IListReceivable } from "interfaces/interfaces/Receivable/IListReceivable";
import { LayoutSecurePage } from "layout/Authenticated/LayoutSecurePage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "routes/enum/routes.enum";
import { TextUtils } from "utils/textUtils";
import { ReceivableTable } from "./components/ReceivableTable/ReceivableTable";

export const ViewReceivablePage: React.FC = () => {
  const { notify } = useNotification();
  const { receivableService } = useService();
  const navigate = useNavigate();

  const [receivables, setReceivables] = useState<IListReceivable[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await receivableService.getAll();
      setReceivables(data);
    } catch (err: any) {
      const error: IError = err;
      const customError = TextUtils.getCustomError(error);

      if (customError) {
        customError.map(({ message, type }) => notify(message, type));
      } else {
        notify("Erro ao carregar dados, contate o suporte!", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <LayoutSecurePage title="Listagem de recebíveis">
      <div className="mt-12 flex flex-col gap-4 px-10 pb-12">
        <div className="flex w-full justify-end">
          <TextButton
            onClick={() => navigate(RoutesEnum.UserRoute.RegisterPayable)}
            type="primary"
          >
            Criar recebível
          </TextButton>
        </div>

        <ReceivableTable loading={loading} receivables={receivables} />
      </div>
    </LayoutSecurePage>
  );
};
