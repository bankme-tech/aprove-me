import { useEffect, useState } from "react";
import { PayableItem } from "./payableItem";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

type dataProps = {
    id: string;
    value: number;
    emissionDate: string;
    assignorId: string
}
  
const Payables = () => {
    const [payablesData, setPayablesData] = useState([]);

  useEffect(() => {
    const fetchPayables = async () => {
      try {
        const id = '550e8400-e29b-41d4-a716-446655440060'
        const token = localStorage.getItem('access_token');
        const response = await axios.get(apiBaseUrl + '/integrations/assignor/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayablesData(response.data);
      } catch (error) {
        console.error('Error when fetching payables: ', error);
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