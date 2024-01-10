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

			<div className="flex grow justify-between flex-col">
				<ul>
					{data.map(function (entry) {
						return (
							<li key={entry.id}>
								<Link href={`/assignors/${entry.id}`}>
									<h3 className="text-xl">{entry.name}</h3>
									<h5 className="text-xs">{entry.email}</h5>
								</Link>	
							</li>
						)
					})}
				</ul>

				<Pagination {...metadata} />
			</div>
		</>
	)
}