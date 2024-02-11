import { BASE_URL } from "@/contants";

const AssignorsList = async () => {

    const res = await fetch(`${BASE_URL}/integrations/assignor`);
    const assignors = await res.json();

    if(!assignors.name) {
        return <div>Nenhum cedente listado</div>
    }

    return (
        <div>
            {assignors.map((assignor: any) => (
                <div>{assignor.name}</div>
            ))}
        </div>
    )
}

export default AssignorsList;