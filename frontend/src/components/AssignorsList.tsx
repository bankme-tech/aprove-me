import { BASE_URL } from "@/contants";
import AssignorItem from "./AssignorItem";

const AssignorsList = async ({ token }: {
    token: string
}) => {
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
                <AssignorItem key={assignor.id} assignor={assignor} />
            ))}
        </div>
    )
}

export default AssignorsList;