import { buttonVariants } from "@/components/ui/button";
import Dashtitle from "@/components/ui/dashtitle";
import { Pagination } from "@/components/ui/pagination";
import { index } from "@/server/assignor";
import { Edit, Trash } from "lucide-react";
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
							<li key={entry.id} className="flex justify-between">
								<Link href={`/assignors/${entry.id}`} className="w-full">
									<h3 className="text-xl">{entry.name}</h3>
									<h5 className="text-xs">{entry.email}</h5>
								</Link>

								<div className="flex gap-2">
									<Link className={buttonVariants({ size: "sm" })} href={`/assignors/${entry.id}/update`}><Edit /></Link>
									<Link className={buttonVariants({ size: "sm", variant: "destructive" })} href={`/assignors/${entry.id}/delete`}><Trash /></Link>
								</div>
							</li>
						)
					})}
				</ul>

				<Pagination {...metadata} />
			</div>
		</>
	)
}