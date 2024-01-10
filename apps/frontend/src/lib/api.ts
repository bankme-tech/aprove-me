import { cookies } from "next/headers"


export default function api (url: string, args?: Parameters<typeof fetch>[1]) {
	const token = cookies().get("token")?.value;

	console.log(args)

	return fetch(`${process.env.API_URL}${url}`, {
		...args,
		headers: {
			"Content-Type": "application/json",
			...(args?.headers || {}),
			...(token ? { Authorization: `Bearer ${token}` } : {})
		}
	})
}