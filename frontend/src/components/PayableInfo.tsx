import { BASE_URL } from "@/contants";
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

    console.log(payable);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Valor</p>
                <p>{payable.value}</p>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Data de emissão</p>
                <p>{payable.emissionDate}</p>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Cedente</p>
                <Link
                    href={`/assignors/${payable.assignorId}`}
                    className="text-blue-600 underline"
                >{payable.assignor.name}</Link>
            </div>
        </div>
    )
}

export default PayableInfo;