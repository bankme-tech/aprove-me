import { BASE_URL } from "@/contants";
import PayableItem from "./PayableItem";
import { cookies } from "next/headers";

const PayablesList = async () => {

    const token = cookies().get('bankme.token')?.value;

    const res = await fetch(`${BASE_URL}/integrations/payable`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    const data = await res.json();

    console.log(data);

    return (
        <div className="w-full">
            {data.map((payable: any) => (
                <PayableItem key={payable.id} payable={payable} />
            ))}
        </div>
    )
}

export default PayablesList;