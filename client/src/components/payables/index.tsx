import { useEffect, useState } from "react";
import { PayableItem } from "./payableItem";
import { Payable, getAllPayables } from "../../api";
import {  useNavigate } from "react-router-dom";

type dataProps = {
    id: string;
    value: number;
    emissionDate: string;
    assignorId: string
}
  
const Payables = () => {
    const [payablesData, setPayablesData] = useState<Payable[]>([]);
    const navigate = useNavigate()    

  useEffect(() => {
    const fetchPayables = async () => {
      try {
        const response = await getAllPayables()

        setPayablesData(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error when fetching payables: ', error);
        if (error.response.status === 401) {
          navigate("/");
        }
      }
    };

    fetchPayables();
  }, [navigate]);



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