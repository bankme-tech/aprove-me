import { BASE_URL } from "@/contants";
import { cookies } from "next/headers";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PayableItemActions from "./PayableItemActions";

const PayablesList = async () => {

    const token = cookies().get('bankme.token')?.value;

    const res = await fetch(`${BASE_URL}/integrations/payable`, {
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
            <Column header="Valor (R$)" field="value" />
            <Column header="Cedente" field="assignor.name" />
            <Column header="" field="" body={PayableItemActions} />
        </DataTable>
    )
}

export default PayablesList;