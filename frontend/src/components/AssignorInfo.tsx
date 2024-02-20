import { BASE_URL } from "@/contants";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const AssignorInfo = async ({ id }: {
    id: string
}) => {
    const token = cookies().get('bankme.token')?.value;

    const res = await fetch(`${BASE_URL}/integrations/assignor/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (res.status === 404) {
        notFound();
    }

    const assignor = await res.json();

    return (
        <div className="w-full grid grid-cols-5 bg-white p-6">
            <div className="flex flex-col gap-1">
                <p className="font-bold">Nome</p>
                <p>{assignor.name}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-bold">CPF</p>
                <p>{assignor.document}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-bold">Email</p>
                <p>{assignor.email}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-bold">Telefone</p>
                <p>{assignor.phone}</p>
            </div>
        </div>
    )
}

export default AssignorInfo;