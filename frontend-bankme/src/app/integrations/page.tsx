'use client'

import {useRouter} from "next/navigation";
import Sidebar from "../../components/Sidebar";

export default function Integrations() {
	const router = useRouter();
	return (
		<main className=" flex">
			<Sidebar></Sidebar>
		</main>
	);
}
