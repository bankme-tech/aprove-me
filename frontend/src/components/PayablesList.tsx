import { BASE_URL } from "@/contants";
import PayableItem from "./PayableItem";

const PayablesList = async ({ token }: {
    token: string
}) => {
    const res = await fetch(`${BASE_URL}/integrations/payable`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    const payables = await res.json();

    return (
        <div className="w-full">
            {payables.map((payable: any) => (
                <PayableItem key={payable.id} payable={payable} />
            ))}
        </div>
    )
}

export default PayablesList;