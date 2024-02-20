import { BASE_URL } from "@/contants";
import { currency } from "@/helpers/currency";
import { formatDate } from "@/helpers/format-date";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

const PayableInfo = async ({ id }: {
    id: string
}) => {
    const token = cookies().get('bankme.token')?.value;

    const res = await fetch(`${BASE_URL}/integrations/payable/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (res.status === 404) {
        notFound();
    }

    const payable = await res.json();

    return (
        <div className="w-full grid grid-cols-5 bg-white p-6">
            <div className="flex flex-col gap-1">
                <p className="font-bold">Valor</p>
                <p>{currency(payable.value)}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-bold">Cedente</p>
                <p>{payable.assignor.name}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-bold">Data da emissão</p>
                <p>{formatDate(payable.emissionDate)}</p>
            </div>
        </div>
    )
}

export default PayableInfo;