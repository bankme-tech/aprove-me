import { buttonVariants } from "@/components/ui/button";
import Dashtitle from "@/components/ui/dashtitle";
import { show } from "@/server/assignor";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page ({ params } : { params: { id: string } }) {
	const { data } = await show(params.id)

	if (!data) return notFound()

	return (
		<>
			<Dashtitle title={data.name} back="/assignors">
				<Link className={buttonVariants({ variant: "default" })} href={`/assignors/${data.id}/update`}>Editar</Link>
				<Link className={buttonVariants({ variant: "destructive" })} href={`/assignors/${data.id}/delete`}>Apagar</Link>
			</Dashtitle>

			<ul>
				<li>Nome: {data.name}</li>
				<li>Documento: {data.document}</li>
				<li>Telefone: {data.phone}</li>
				<li>Email: {data.email}</li>
			</ul>
		</>
	)
}