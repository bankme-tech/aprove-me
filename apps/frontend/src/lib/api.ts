import { cookies } from "next/headers"


export default function api (url: string, args?: Parameters<typeof fetch>[1]) {
	const token = cookies().get("token")?.value;

	return fetch(`${process.env.API_URL}${url}`, {
		headers: {
			...(token ? { Authorization: `Bearer ${token}` } : {})
		}
	})
}