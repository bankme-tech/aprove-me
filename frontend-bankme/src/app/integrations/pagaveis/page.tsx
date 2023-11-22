import Sidebar from "../../../components/Sidebar";
import Payable from "../../../components/Integration/pagaveis/pagaveis";

export default function Pagaveis() {
	return (
		<main className=" flex">
			<Sidebar></Sidebar>
			<Payable></Payable>
		</main>
	);
}
