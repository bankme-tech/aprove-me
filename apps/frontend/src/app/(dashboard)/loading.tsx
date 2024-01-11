import { Loader } from "lucide-react";

export default function Loading () {
	// -------------------------------------------------
	// Render
	// -------------------------------------------------

	return (
		<div className="grow flex justify-center items-center">
			<Loader className="animate-spin" size={64} />
		</div>
	)
}