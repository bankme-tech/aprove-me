import { BASE_URL } from "@/contants";
import { notFound } from "next/navigation";

const AssignorInfo = async ({ token, id }: {
    token: string | null, id: string
}) => {

    const res = await fetch(`${BASE_URL}/integrations/assignor/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const assignor = await res.json();

    if (!assignor.id) {
        notFound();
    }

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