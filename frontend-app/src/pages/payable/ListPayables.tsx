import { useEffect, useState } from "react";
import { Payable } from "../../types";
import { axiosInstance as axios } from "../../api";
import PayableCard from "../../components/PayableCard";
import { getTokenAndSetHeaders } from "../../helpers";

function ListPayables() {
  const [payables, setPayables] = useState<Payable[]>();

  useEffect(() => {
    const config = getTokenAndSetHeaders();
    const getPaybales = async () => {
      try {
        const { data } = await axios.get('/payable', config);
        setPayables(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        alert('Você não está logado.');
      }
    }
    getPaybales();
  }, []);

  return (
    <main>
      <h1>Recebíveis</h1>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
        </thead>
      {payables?.map(({id, value, emissionDate}) => {
        return <PayableCard id={id} value={value} emissionDate={emissionDate} />
      })}
      </table>
    </main>
  )
}

export default ListPayables;