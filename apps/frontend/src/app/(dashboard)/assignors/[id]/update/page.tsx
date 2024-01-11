import Dashtitle from "@/components/ui/dashtitle";
import { Button } from "@/components/ui/button";
import { show, update } from "@/server/assignor";
import AssignorForm from "../../_components/form";

export default async function Page ({ params }: { params: { id: string } }) {
	const { data } = await show(params.id)

	return (
		<>
			<Dashtitle title="Atualizar cedente" back="/assignors" />

			<AssignorForm action={update} data={data}>
				<input name="id" value={params.id} type="hidden" />
				<Button>Atualizar</Button>
			</AssignorForm>
		</>
	)
}