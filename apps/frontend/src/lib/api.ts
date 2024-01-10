import { cookies } from "next/headers"


export default function api (url: string, args?: Parameters<typeof fetch>[1]) {
	const token = cookies().get("token")?.value;

	return fetch(`${process.env.API_URL}${url}`, {
		...args,
		headers: {
			"Content-Type": "application/json",
			...(args?.headers || {}),
			...(token ? { Authorization: `Bearer ${token}` } : {})
		}
	})
}

export async function currentUser () {
	const response: any = await api("/integrations/auth").then(t => t.json())

	return response?.data as undefined | { id: string; login: string }
}