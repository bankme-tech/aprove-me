"use client";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {getIdByToken, getNameByToken} from "../../authService/authService";

export default function Integrations() {
	const payableForm = useForm<PayableFormData>();
	const assignorForm = useForm();
	interface PayableFormData {
		value: string;
		assignorId: string;
	}

	const onSubmitPayable = async (data: string) => {
		const authToken = localStorage.getItem("token");
		if (!authToken) {
			console.error("Token de autenticação não encontrado.");
			return;
		}
		const {value, assignorId} = data;
		const numericValue = parseFloat(value);

		try {
			const apiUrl =
				"https://bankme-api-5n7gl.ondigitalocean.app/integrations/payable";

			const response = await axios.post(
				apiUrl,
				{value: numericValue, assignorId},
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			openSuccessModal();
			setTimeout(() => {
				closeSuccessModal();
			}, 1000);
		} catch (error: any) {
			console.error(error);

			if (error.response) {
				if (error.response.data && error.response.data.message) {
					openErrorModal(error.response.data.message);
				} else {
					openErrorModal(
						"Erro interno do servidor. Tente novamente mais tarde."
					);
				}
				setTimeout(() => {
					closeErrorModal();
				}, 2000);
			}
		}
	};
	const onSubmitAssignor = async (data: any) => {
		const authToken = localStorage.getItem("token");

		if (!authToken) {
			console.error("Token de autenticação não encontrado.");
			return;
		}

		try {
			const apiUrl =
				"https://bankme-api-5n7gl.ondigitalocean.app/integrations/assignor";

			const response = await axios.post(apiUrl, data, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			console.log(response.data);
			openSuccessModal();
			setTimeout(() => {
				closeSuccessModal();
			}, 1000);
		} catch (error: any) {
			console.error(error.message.data);

			if (error.response) {
				if (error.response.data && error.response.data.message) {
					openErrorModal(error.response.data.message);
				} else {
					openErrorModal(
						"Erro interno do servidor. Tente novamente mais tarde."
					);
				}

				setTimeout(() => {
					closeErrorModal();
				}, 2000);
			}
		}
	};

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

	const openSuccessModal = () => {
		setIsSuccessModalOpen(true);
	};

	const closeSuccessModal = () => {
		setIsSuccessModalOpen(false);
	};
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const openErrorModal = (message: string) => {
		setErrorMessage(message);
		setIsErrorModalOpen(true);
	};

	const closeErrorModal = () => {
		setIsErrorModalOpen(false);
		setErrorMessage("");
	};

	const name = getNameByToken();

	return (
		<div className=" bg-white relative  flex flex-col  h-screen w-full items-start justify-evenly p-4 m-4 rounded-md">
			<h1 className="font-bold text-xl ml-16 text-gray-700">Olá, {name}</h1>
			<div className="flex w-full items-center justify-evenly ">
				<div className="border-solid w-1/3 rounded-md border-blue-600 shadow-md border-2 p-12">
					<h1 className=" flex justify-center font-bold text-blue-700 text-xl mb-6">
						Cadastrar pagável
					</h1>
					<form
						onSubmit={payableForm.handleSubmit(onSubmitPayable)}
						className="flex flex-col gap-3 "
					>
						<label className="font-bold text-blue-600 text-lg ">Valor</label>
						<input
							placeholder="Insira aqui o valor"
							{...payableForm.register("value", {
								required: true,
							})}
							className="outline-blue-500 p-1"
						/>
						{payableForm.formState.errors?.value?.type === "required" && (
							<p className="error-message text-red-600 text-sm">
								Por favor, insira o valor.
							</p>
						)}
						<label className="font-bold text-blue-600 text-lg ">
							Cedente Id
						</label>
						<input
							type="text"
							placeholder="Insira aqui a id do cedente"
							{...payableForm.register("assignorId", {
								required: true,
							})}
							className="outline-blue-500 p-1"
						/>
						{payableForm.formState.errors?.assignorId?.type === "required" && (
							<p className="error-message text-red-600 text-sm">
								Por favor, insira a id do cedente.
							</p>
						)}
						<button
							className="bg-base-green px-4 py-2 rounded-md font-bold text-blue-600 "
							type="submit"
							disabled={false}
						>
							Cadastrar
						</button>
					</form>
				</div>
				<div className="border-solid w-1/3 rounded-md border-blue-600 shadow-md border-2 p-12">
					<h1 className=" flex justify-center font-bold text-blue-700 text-xl mb-6">
						Cadastrar Cedente
					</h1>
					<form
						onSubmit={assignorForm.handleSubmit(onSubmitAssignor)}
						className="flex flex-col gap-3 "
					>
						<label className="font-bold text-blue-600 text-lg ">
							CPF ou CNPJ
						</label>
						<input
							type="text"
							placeholder="Insira aqui o cpf ou cnpj"
							{...assignorForm.register("document", {
								required: true,
							})}
							className="outline-blue-500 p-1"
						/>
						{assignorForm.formState.errors?.document?.type === "required" && (
							<p className="error-message text-red-600 text-sm">
								Por favor, insira um documento válido.
							</p>
						)}
						<label className="font-bold text-blue-600 text-lg ">Email</label>
						<input
							type="text"
							placeholder="Insira aqui o email do cedente"
							{...assignorForm.register("email", {
								required: true,
								pattern: /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i,
							})}
							className="outline-blue-500 p-1"
						/>
						{assignorForm.formState.errors?.email?.type === "required" && (
							<p className="error-message text-red-600 text-sm">
								Por favor, insira o email do cedente.
							</p>
						)}
						<label className="font-bold text-blue-600 text-lg ">Telefone</label>
						<input
							type="text"
							placeholder="Insira aqui o telefone do cedente"
							{...assignorForm.register("phone", {
								required: true,
								pattern: /^[0-9]+$/,
							})}
							className="outline-blue-500 p-1"
						/>
						{assignorForm.formState.errors?.phone?.type === "required" && (
							<p className="error-message text-red-600 text-sm">
								Por favor, insira o telefone do cedente.
							</p>
						)}
						<label className="font-bold text-blue-600 text-lg ">Nome</label>
						<input
							type="text"
							placeholder="Insira aqui o nome do cedente"
							{...assignorForm.register("name", {
								required: true,
							})}
							className="outline-blue-500 p-1"
						/>
						{assignorForm.formState.errors?.name?.type === "required" && (
							<p className="error-message text-red-600 text-sm">
								Por favor, insira o nome do cedente.
							</p>
						)}
						<button
							className="bg-base-green px-4 py-2 rounded-md font-bold text-blue-600 "
							type="submit"
							disabled={false}
						>
							Cadastrar
						</button>
					</form>
					{isSuccessModalOpen && (
						<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
							<div className="bg-white p-8 rounded-md">
								<p className="text-base-green text-lg font-semibold">
									Dados enviados com sucesso!
								</p>
							</div>
						</div>
					)}

					{isErrorModalOpen && (
						<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
							<div className="bg-white p-8 rounded-md">
								<p className="text-red-500 text-lg font-semibold">
									{errorMessage}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
