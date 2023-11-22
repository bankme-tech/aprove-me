"use client";
import axios from "axios";
import {useEffect, useState} from "react";
import Image from "next/image";

interface User {
	id: string;
	login: string;
	name: string;
}

export default function User() {
	const [user, setUsers] = useState<User>();
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const apiUrl = `https://bankme-api-5n7gl.ondigitalocean.app/user/`;

				const authToken = localStorage.getItem("token");

				const response = await axios.get(apiUrl, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				});
				if (response.data.length === 0) {
					setIsErrorModalOpen(true);
					setErrorMessage("Não há nenhum cedente cadastrado.");
				}
				//TODO: ajustar para pegar a id do usuário logado
				setUsers(response.data[0]);
			} catch (error) {
				setIsErrorModalOpen(true);
				setErrorMessage(
					"Erro ao processar a solicitação. Tente novamente mais tarde."
				);
			}
		};

		fetchUser();
	}, [isDeleteSuccess]);

	const handleDelete = async (id: string) => {
		try {
			const apiUrl = `https://bankme-api-5n7gl.ondigitalocean.app/user/${id}`;

			const authToken = localStorage.getItem("token");

			const response = await axios.delete(apiUrl, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});

			setIsDeleteSuccess(true);
			setTimeout(() => {
				setIsDeleteSuccess(false);
			}, 1000);
		} catch (error) {
			setIsErrorModalOpen(true);
			setErrorMessage(
				"Erro ao processar a solicitação. Tente novamente mais tarde."
			);
		}
	};

	return (
		<div className=" bg-white relative  flex flex-col h-screen w-full items-start justify-start p-4 m-4 rounded-md">
			<h1 className="w-full flex items-start justify-center text-blue-500 text-2xl font-bold p-4 mb-2">
				Configurações
			</h1>

			{isDeleteSuccess && (
				<div className="success-message bg-green-200 text-green-800 p-2 mb-4 rounded-md">
					Cadastro excluído com sucesso!
				</div>
			)}

			<nav className="w-full flex  items-start justify-start p-4 rounded-xl">
				{user ? (
					<ul
						key={user.id}
						className="w-full flex flex-col justify-evenly text-gray-700 font-bold gap-10 "
					>
						<li className="flex items-center">
							<p className="bg-base-green rounded-md p-4 mr-4">ID:</p>
							<p>{user.id}</p>
						</li>
						<li className="flex items-center">
							<p className="bg-base-green rounded-md p-4 mr-4">Nome:</p>
							<p>{user.name}</p>
						</li>
						<li className="flex items-center">
							<p className="bg-base-green rounded-md p-4 mr-4">Login:</p>
							<p>{user.login}</p>
						</li>
					</ul>
				) : (
					<p>Carregando...</p>
				)}
			</nav>
			<div className="w-full flex  items-center justify-start p-6 rounded-xl gap-20">
				<button className="flex gap-4 font-bold border-solid border-2 border-blue-600 p-4 rounded-md">
					<Image
						src="/pencil-solid.svg"
						width={20}
						height={20}
						alt="pencil"
					></Image>{" "}
					Editar
				</button>

				<button
					className="flex gap-4 font-bold border-solid border-2 border-blue-600 p-4 rounded-md"
					onClick={() => user && handleDelete(user.id)}
					disabled={!user}
				>
					<Image
						src="/trash-can-solid.svg"
						width={20}
						height={20}
						alt="pencil"
					></Image>{" "}
					Excluir
				</button>
			</div>

			{isErrorModalOpen && (
				<div className="error-modal fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50">
					<div className="flex flex-col bg-white font-bold p-8 rounded-md items-end ">
						<p className="text-gray-600 mb-4 font-bold text-2xl">
							{errorMessage}
						</p>
						<button
							className="w-1/6 bg-gray-300 rounded-md px-3 py-2 mt-6"
							onClick={() => setIsErrorModalOpen(false)}
						>
							Fechar
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
