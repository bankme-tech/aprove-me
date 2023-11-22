import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
interface CadastroModalProps {
	closeModal: () => void;
}

const CadastroModal: React.FC<CadastroModalProps> = ({closeModal}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm();
	const password = watch("password", "");

	useEffect(() => {}, [password]);

	const validatePassword = (value: string) => {
		let hasUpperCase = /[A-Z]/.test(value);
		let hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
		let hasNumber = /\d/.test(value);

		return value.length >= 8 && hasUpperCase && hasSymbol && hasNumber;
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

	const onSubmit = async (data: unknown) => {
		try {
			const apiUrl = "https://bankme-api-5n7gl.ondigitalocean.app/user";
			const response = await axios.post(apiUrl, data);

			openSuccessModal();
			setTimeout(() => {
				closeSuccessModal();
				closeModal();
			}, 3000);
		} catch (error: any) {
			console.log(error.message);
			if (error.response) {
				if (error.response.data.statusCode === 401) {
					openErrorModal(`${error.response.data.message}`);
				} else {
					openErrorModal(
						"Erro ao processar a solicitação. Tente novamente mais tarde."
					);
				}
				setTimeout(() => {
					closeErrorModal();
				}, 3000);
			}
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-8 rounded-md">
				<div className="flex justify-between items-center mb-3">
					<h2 className="text-2xl font-bold text-blue-500">Cadastro</h2>
					<button
						className="text-white bg-blue-500 px-3 py-1 rounded-md"
						onClick={closeModal}
					>
						X
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
					<label className="font-bold text-gray-700 text-lg ">Nome</label>
					<input
						type="text"
						placeholder="Digite seu Nome"
						{...register("name", {
							required: true,
						})}
						className="outline-blue-500 p-1"
					/>
					{errors?.nome?.type === "required" && (
						<p className="error-message text-red-600 text-sm">
							Nome é obrigatório.
						</p>
					)}

					<label className="font-bold text-gray-700 text-lg ">Email</label>
					<input
						type="text"
						placeholder="Digite seu Email"
						{...register("login", {
							required: true,
						})}
						className="outline-blue-500 p-1"
					/>
					{errors?.login?.type === "required" && (
						<p className="error-message text-red-600 text-sm">
							Login é obrigatório.
						</p>
					)}
					<label className="font-bold text-gray-700 text-lg ">Senha</label>
					<input
						type="password"
						placeholder="Digite sua Senha"
						{...register("password", {
							required: true,
							minLength: 8,
							validate: validatePassword,
						})}
						className="outline-blue-500 p-1"
					/>
					{errors.password?.type === "required" && (
						<p className="error-message text-red-600 text-sm">
							Senha obrigatória.
						</p>
					)}

					{errors.password?.type === "minLength" && (
						<p className="error-message text-red-600 text-sm">
							Senha deve ter no mínimo 8 caracteres.
						</p>
					)}
					{errors.password?.type === "validate" && (
						<p className="error-message text-red-600 text-sm">
							Senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1
							símbolo e 1 número.
						</p>
					)}
					<button
						className="bg-base-green px-4 py-2 rounded-md font-bold text-blue-600 "
						onClick={() => handleSubmit(onSubmit)()}
					>
						Enviar
					</button>
				</form>
				{isSuccessModalOpen && (
					<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
						<div className="bg-white p-8 rounded-md">
							<p className="text-green-500 text-lg font-semibold">
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
	);
};

export default CadastroModal;
