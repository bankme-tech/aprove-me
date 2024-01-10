import { buttonVariants } from "@/components/ui/button";
import Dashtitle from "@/components/ui/dashtitle";
import { Pagination } from "@/components/ui/pagination";
import { index } from "@/server/assignor";
import Link from "next/link";

export default async function Page () {
	const { data, ...metadata } = await index({})

	return (
		<>
			<Dashtitle title="Cedentes" back="/">
				<Link className={buttonVariants()} href="/assignors/new">Adicionar cedente</Link>
			</Dashtitle>

			<Pagination {...metadata} />
		</>
	)
}