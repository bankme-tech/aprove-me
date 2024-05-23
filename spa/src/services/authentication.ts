import { fetchAPI } from "./fetchAPI";

export const authenticatePermission = async (login: string, password: string) => {
	const response = await fetchAPI('auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ login, password })
	})

	return response.json();
}

export const registerPermission = async (login: string, password: string) => {
	await fetchAPI('permissions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ login, password })
	});

	// return data.json();
}