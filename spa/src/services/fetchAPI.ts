export const fetchAPI = async (url: string, options?: RequestInit) => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/integrations/${url}`, options)
	
  // Token inválido ou expirado
	if(response?.status === 401) {
		localStorage.removeItem('accessToken');
	}
	if (!response?.ok) {
		const errorBody = await response?.json(); // Ler o corpo da resposta como JSON
		const errorMessage = errorBody.message; // Acessar a mensagem de erro
		throw new Error(errorMessage);
	}
	return response;
}