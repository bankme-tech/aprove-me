import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import payableService from "../../services/payableService";
import { Payable } from "../../model/payable";
import { Spin } from "antd";
import { isAxiosError } from "axios";
import assignorService from "../../services/assignorService";
import { Assignor } from "../../model/assignor";

const PayableInfo = () => {
  const [payable, setPayable] = useState<Payable | null>(null);
  const [loading, setLoading] = useState(true);
  const [assignor, setAssignor] = useState<Assignor | null>(null);
  const navigate = useNavigate();

  const params = useParams<{
    id?: string;
  }>();

  useEffect(() => {
    const fetchPayable = async () => {
      const response = await payableService.findById(params.id!);
      fetchAssignors(response.data.assignor);
      setPayable(response.data);
    };

    const fetchAssignors = async (id: string) => {
      try {
        const reponse = await assignorService.findById(id);
        setAssignor(reponse.data);
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            toast.error("Pagável não encontrado");
            return;
          }
        }

        toast.error("Erro ao buscar pagável");
      } finally {
        setLoading(false);
      }
    };

    try {
      setLoading(true);
      fetchPayable();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          toast.error("Pagável não encontrado");
          navigate("/");
          return;
        }
      }

      navigate("/");
      toast.error("Erro ao buscar pagável");
    } finally {
      setLoading(false);
    }
  }, [navigate, params.id]);

  if (loading || !payable) {
    return (
      <div className="flex items-center justify-center size-full flex-col pt-24">
        <Spin />
        <span>Carregando...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4  w-full items-center pt-8">
      <h1 className="text-2xl">Informações do pagável</h1>

      <div className="flex flex-col gap-2">
        <SimpleInfo label="ID" value={payable.id} />
        <SimpleInfo label="Valor" value={payable.value} />
        <SimpleInfo
          label="Data de emissão"
          value={dayjs(payable.emissionDate).format("DD/MM/YYYY HH:mm")}
        />
        <SimpleInfo label="Id do Cedente" value={payable.assignor} />
      </div>

      {assignor && (
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-2xl">Informações do pagável</h1>
          <SimpleInfo label="ID" value={assignor.id} />
          <SimpleInfo label="Nome" value={assignor.name} />
          <SimpleInfo label="CPF" value={assignor.document} />
          <SimpleInfo label="E-mail" value={assignor.email} />
          <SimpleInfo label="Telefone" value={assignor.phone} />
        </div>
      )}
    </div>
  );
};

const SimpleInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div>
    <span className="font-bold">{label}: </span>
    <span>{value}</span>
  </div>
);

export default PayableInfo;
