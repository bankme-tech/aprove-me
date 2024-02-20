import { BASE_URL } from "@/contants";
import AssignorItem from "./AssignorItem";
import { cookies } from "next/headers";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AssignorItemActions from "./AssignorItemActions";

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
        <DataTable
            className="w-full"
            value={data}
            paginator
            rowsPerPageOptions={[10, 50, 100]}
            rows={10}
        >
            <Column header="Nome" field="name" />
            <Column header="Email" field="email" />
            <Column header="Telefone" field="phone" />
            <Column header="Documento" field="document" />
            <Column header="" field="" body={AssignorItemActions} />
        </DataTable>
    )
}

export default AssignorsList;