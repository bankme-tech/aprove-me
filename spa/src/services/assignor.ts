import { AssignorType } from "../types";
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

export const getAssignor = async (id: string) => {
	const token = localStorage.getItem('accessToken');
	const response = await fetchAPI(`assignor/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	})
	return response.json();
}

export const createAssignor = async (assignorData: AssignorType) => {
	const token = localStorage.getItem('accessToken');
	const response = await fetchAPI('assignor', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(assignorData)
	})

	return response.json();
}

export const editAssignor = async (assignorData: AssignorType) => {
	const token = localStorage.getItem('accessToken');
	const response = await fetchAPI(`assignor/${assignorData.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(assignorData)
	})
	return response.json();
}

export const deleteAssignor = async (id: string) => {
	const token = localStorage.getItem('accessToken');
	const response = await fetchAPI(`assignor/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	})
	return response.json();
}