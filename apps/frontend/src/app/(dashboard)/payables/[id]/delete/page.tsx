import Form from "@/components/form/form";
import { Button } from "@/components/ui/button";
import Dashtitle from "@/components/ui/dashtitle";
import { remove, show } from "@/server/payable";
import { notFound } from "next/navigation";

export default async function Page ({ params } : { params: { id: string } }) {
	const { data } = await show(params.id)

	if (!data) return notFound()

	return (
		<>
			<Dashtitle title={data.value} back={`/payables/${params.id}`} />

			<Form action={remove}>
				<input name="id" type="hidden" value={params.id} />

				<p>Tem certeza que quer apagar esse recebível?</p>

				<Button type="submit" variant="destructive">Apagar</Button>
			</Form>
		</>
	)
}