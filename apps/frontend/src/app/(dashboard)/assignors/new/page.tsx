import Dashtitle from "@/components/ui/dashtitle";
import { Button } from "@/components/ui/button";
import { store } from "@/server/assignor";
import AssignorForm from "../_components/form";

export default function Page () {
	return (
		<>
			<Dashtitle title="Criar cedente" back="/assignors" />

			<AssignorForm action={store}>
				<Button>Criar</Button>
			</AssignorForm>
		</>
	)
}