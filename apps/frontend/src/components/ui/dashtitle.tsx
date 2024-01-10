// Packages
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

// -------------------------------------------------
// Props
// -------------------------------------------------

type Props = {
	title: any;
	back?: string;
	children?: any;
}

export default function Dashtitle (props: Props) {
	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<>
			<h1 className="text-2xl font-bold flex items-center">
				{
					props.back &&
					<Link href={props.back}><ChevronLeft size="28" /></Link>
				}
				{props.title}
			</h1>

			{
				props.children &&

				<div className="flex my-8 gap-4">
					{props.children}
				</div>
			}
		</>
	)
}