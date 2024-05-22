import { api } from "@/api/api";
import { Payable } from "@/interfaces/interfaces";
import { PayableCard } from "./PayableCard";

export async function List() {
    const { data } = await api.get<Payable[]>('payable');
  
    return (
        <div className="mx-auto px-8 py-2 mt-6">
            {data.length > 0 ? 
                <div className="lg:grid lg:grid-cols-4 lg:gap-6 flex flex-col gap-4">
                    {data.map((payable) => (
                        <PayableCard key={payable.id} id={payable.id} value={payable.value} date={payable.emissionDate}/>
                    ))}
                </div> 
            :
            
            (
                <h2 className="text-lg lg:text-4xl text-center text-bold text-white mb-2 mx-2">Register new payables to see here!</h2>
 
            )}
            
        </div>
      
    )
  }



