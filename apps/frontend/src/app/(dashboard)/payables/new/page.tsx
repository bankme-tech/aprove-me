import Dashtitle from "@/components/ui/dashtitle";
import { Button } from "@/components/ui/button";
import { store } from "@/server/assignor";
import PayableForm from "../_components/form";

export default function Page () {
	return (
		<>
			<Dashtitle title="Criar recebível" back="/payables" />

			<PayableForm action={store}>
				<Button>Criar</Button>
			</PayableForm>
		</>
	)
}