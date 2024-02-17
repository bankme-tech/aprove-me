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

    console.log(assignor);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Nome</p>
                <p>{assignor.name}</p>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">CPF</p>
                <p>{assignor.document}</p>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Email</p>
                <p>{assignor.email}</p>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="font-bold">Telefone</p>
                <p>{assignor.phone}</p>
            </div>
        </div>
    )
}

export default AssignorInfo;