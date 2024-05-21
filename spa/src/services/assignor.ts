import { fetchAPI } from "./fetchAPI";

export const getAssignors = async () => {
	const token = localStorage.getItem('accessToken');
	const response = await fetchAPI('assignor', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	})
	
	return response.json();
}

