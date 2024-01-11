import Dashtitle from "@/components/ui/dashtitle";
import { Button } from "@/components/ui/button";
import { show, update } from "@/server/payable";
import PayableForm from "../../_components/form";

export default async function Page ({ params }: { params: { id: string } }) {
	const { data } = await show(params.id)

	return (
		<>
			<Dashtitle title="Atualizar recebível" back="/payables" />

			<PayableForm action={update} data={{...data, emissionDate: new Date(data.emissionDate).toISOString().split("T")[0] }} override>
				<input name="id" value={params.id} type="hidden" />
				<Button>Atualizar</Button>
			</PayableForm>
		</>
	)
}