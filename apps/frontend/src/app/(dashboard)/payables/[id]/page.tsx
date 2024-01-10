import { buttonVariants } from "@/components/ui/button";
import Dashtitle from "@/components/ui/dashtitle";
import DateDisplay from "@/components/ui/date-display";
import { show } from "@/server/payable";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page ({ params } : { params: { id: string } }) {
	const { data } = await show(params.id)

	if (!data) return notFound()

	return (
		<>
			<Dashtitle title={data.value} back="/payables">
				<Link className={buttonVariants({ variant: "default" })} href={`/payables/${data.id}/update`}>Editar</Link>
				<Link className={buttonVariants({ variant: "destructive" })} href={`/payables/${data.id}/delete`}>Apagar</Link>
			</Dashtitle>

			<ul>
				<li>Valor: {data.value}</li>
				<li>Data de emissão: <DateDisplay date={data.emissionDate} /></li>
			</ul>
		</>
	)
}