import { buttonVariants } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import Link from "next/link";

export default function NotFound () {
	// -------------------------------------------------
	// Render
	// -------------------------------------------------

	return (
		<div className="grow flex justify-center items-center flex-col gap-2">
			<Ghost size={128} />

			<h1 className="text-2xl">Essa página não foi encontrada</h1>
			<h2>A url solicitada não pôde ser encontrada ou você não tem permissão de acessa-la</h2>

			<Link className={buttonVariants()} href="/">Ir para home</Link>
		</div>
	)
}