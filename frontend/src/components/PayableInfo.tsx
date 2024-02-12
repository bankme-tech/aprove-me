import { BASE_URL } from "@/contants";

const PayableInfo = async ({ token, id }: {
    token: string | null, id: string
}) => {

    const res = await fetch(`${BASE_URL}/integrations/payable/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const payable = await res.json();
    
    console.log(payable);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Valor</p>
                <p>{payable.value}</p>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Cedente</p>
                <p>{payable.assignor.name}</p>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Data de emissão</p>
                <p>{payable.emissionDate}</p>
            </div>
        </div>
    )
}

export default PayableInfo;