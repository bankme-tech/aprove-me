import { buttonVariants } from "@/components/ui/button";
import Dashtitle from "@/components/ui/dashtitle";
import { Pagination } from "@/components/ui/pagination";
import { index } from "@/server/payable";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

export default async function Page () {
	const { data, ...metadata } = await index({})

	return (
		<>
			<Dashtitle title="Recebíveis" back="/">
				<Link className={buttonVariants()} href="/payables/new">Adicionar recebível</Link>
			</Dashtitle>

			<div className="flex grow justify-between flex-col">
				<ul>
					{data.map(function (entry) {
						return (
							<li key={entry.id} className="flex justify-between">
								<Link href={`/payables/${entry.id}`} className="w-full">
									<h3 className="text-xl">{entry.value}</h3>
									<h5 className="text-xs">{entry.emissionDate}</h5>
								</Link>

								<div className="flex gap-2">
									<Link className={buttonVariants({ size: "sm" })} href={`/payables/${entry.id}/update`}><Edit /></Link>
									<Link className={buttonVariants({ size: "sm", variant: "destructive" })} href={`/payables/${entry.id}/delete`}><Trash /></Link>
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