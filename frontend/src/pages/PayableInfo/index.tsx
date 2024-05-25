import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

const PayableInfo = () => {
  const payable = useLocation().state.payable;

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
