"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {isAuthenticated} from "../../authService/authService";
import Link from "next/link";

export default function Sidebar() {
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated()) {
			router.push("/");
		}
	}, [router]);

	const onClickIntegration = () => {
		router.push("/integrations");
	};

	const onClickCedentes = () => {
		router.push("/integrations/cedentes");
	};

	const onClickPagaveis = () => {
		router.push("/integrations/pagaveis");
	};

	const onClickSettings = () => {
		router.push("/settings");
	};

	const onClickLogout = () => {
		localStorage.clear();
		router.push("/");
	};

	return isAuthenticated() ? (
		<nav className="relative h-screen left-0 top-0 w-1/5 z-50 flex flex-col justify-around px-8 bg-blue-200 shadow-gray-400 shadow-md selection:text-blue-80">
			{/* Logo */}
			<div className="mb-6 flex justify-center">
				<Link href={"/"}>
					<Image src="/logo-bankme.png" alt="b logo" width={50} height={50} />
				</Link>
			</div>
			<button
				className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md"
				onClick={onClickIntegration}
			>
				<Image
					alt="icon"
					src="/pen-to-square-solid.svg"
					width={20}
					height={20}
				/>
				<span className="ml-2">Cadastrar</span>
			</button>
			<button
				className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md"
				onClick={onClickCedentes}
			>
				<Image alt="icon" src="/file-lines-solid.svg" width={20} height={20} />
				<span className="ml-2">Cedentes</span>
			</button>
			<button
				className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md"
				onClick={onClickPagaveis}
			>
				<Image alt="icon" src="/file-lines-solid.svg" width={20} height={20} />
				<span className="ml-2">Pagáveis</span>
			</button>
			<button
				className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md"
				onClick={onClickSettings}
			>
				<Image alt="icon" src="/gears-solid.svg" width={20} height={20} />
				<span className="ml-2">Configurações</span>
			</button>
			<button
				className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md"
				onClick={onClickLogout}
			>
				<Image
					alt="icon"
					src="/arrow-right-from-bracket-solid.svg"
					width={20}
					height={20}
				/>
				<span className="ml-2">Logout</span>
			</button>
		</nav>
	) : null;
}
