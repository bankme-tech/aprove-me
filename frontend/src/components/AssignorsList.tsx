import { BASE_URL } from "@/contants";
import Link from "next/link";

const AssignorsList = async ({token}: {
    token: string | null
}) => {

    console.log(token);

    if(!token) return;

    const res = await fetch(`${BASE_URL}/integrations/assignor`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    const assignors = await res.json();

    return (
        <div className="w-full">
            {assignors.map((assignor: any) => (
                <div className="w-full flex items-center justify-between py-4">
                    <p>{assignor.name}</p>

                    <Link
                     href={`/assignors/${assignor.id}`}
                     className="underline text-[--primary]"
                     >Ver detalhes</Link>
                </div>
            ))}
        </div>
    )
}

export default AssignorsList;