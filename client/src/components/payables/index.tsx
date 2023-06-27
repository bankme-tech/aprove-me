import { useEffect, useState } from "react";
import { PayableItem } from "./payableItem";
import { getPayables } from "../../api";
import { Navigate, redirect, useNavigate } from "react-router-dom";

type dataProps = {
    id: string;
    value: number;
    emissionDate: string;
    assignorId: string
}
  
const Payables = () => {
    const [payablesData, setPayablesData] = useState([]);
    const navigate = useNavigate()

  useEffect(() => {
    const fetchPayables = async () => {
      try {

        const id = '550e8400-e29b-41d4-a716-446655440350'
        const response = await getPayables(id)

        setPayablesData([response.data]); //TODO: switch to getAll endpoint or adapt the same one but not sending ID
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error when fetching payables: ', error);
        if (error.response.status === 401) {
          navigate("/");
        }
      }
    };

    fetchPayables();
  }, []);



    return (
      <div className="flex flex-col items-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Payables</h2>
        {payablesData.map((item: dataProps) => (
          <PayableItem
            key={item.id}
            id={item.id}
            value={item.value}
            emissionDate={item.emissionDate}
          />
        ))}
      </div>
    );
  };
  
  export default Payables;