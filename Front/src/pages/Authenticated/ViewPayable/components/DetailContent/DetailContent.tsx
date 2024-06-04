import { LoadingAlert } from "components/LoadingAlert/LoadingAlert";
import { TextList } from "components/Text/TextList/TextList";
import { useNotification } from "contexts/Notification/NotificationContext";
import { useService } from "contexts/Service/ServiceContext";
import { IError } from "interfaces/interfaces/Error/IError";
import { IListReceivable } from "interfaces/interfaces/Receivable/IListReceivable";
import { IReceivable } from "interfaces/interfaces/Receivable/IReceivable";
import React, { useEffect, useState } from "react";
import { TextUtils } from "utils/textUtils";

interface IDetailContentProps {
  receivable: IListReceivable;
}

export const DetailContent: React.FC<IDetailContentProps> = ({
  receivable
}) => {
  const { notify } = useNotification();
  const { receivableService } = useService();

  const [loadingDetail, setLoadingDetail] = useState<boolean>();
  const [receivableDetail, setReceivableDetail] = useState<IReceivable>();

  const fetch = async () => {
    try {
      setLoadingDetail(true);
      const data = await receivableService.getById(receivable.id);
      setReceivableDetail(data);
    } catch (err: any) {
      const error: IError = err;
      const customError = TextUtils.getCustomError(error);

      if (customError) {
        notify(customError.message, customError.type);
      } else {
        notify(
          "Erro ao carregar detalhes do recebível, contate o suporte!",
          "error"
        );
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex max-w-7xl flex-col justify-center gap-4">
      {loadingDetail ? (
        <LoadingAlert />
      ) : (
        <div className="m-2 rounded-lg border border-blue-2 px-4 py-2 shadow-lg shadow-blue-2">
          <TextList
            title="Cedente"
            infos={[
              {
                title: "documento",
                description: receivableDetail?.assignor.document,
                type: "text"
              },
              {
                title: "email",
                description: receivableDetail?.assignor.email,
                type: "text"
              },
              {
                title: "nome",
                description: receivableDetail?.assignor.name,
                type: "text"
              },
              {
                title: "celular",
                description: receivableDetail?.assignor.name,
                type: "text"
              }
            ]}
            numberOfColumns={4}
          />
        </div>
      )}
    </div>
  );
};
