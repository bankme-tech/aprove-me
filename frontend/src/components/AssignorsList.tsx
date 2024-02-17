import { BASE_URL } from "@/contants";
import AssignorItem from "./AssignorItem";
import { cookies } from "next/headers";

const AssignorsList = async () => {

    const token = cookies().get('bankme.token')?.value;

    const res = await fetch(`${BASE_URL}/integrations/assignor`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    const data = await res.json();

    console.log(data);

    return (
        <div className="w-full">
            {data.map((assignor: any) => (
                <AssignorItem key={assignor.id} assignor={assignor} />
            ))}
        </div>
    )
}

export default AssignorsList;