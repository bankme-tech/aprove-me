"use server"

import api from "@/lib/api"

export async function login (state: any, form: FormData) {
	const login = form.get("login")
	const password = form.get("password")

	const response = await api("/integrations/auth", {
		method: "post",
		body: JSON.stringify({
			login,
			password,
		})
	}).then(t => t.json())

	if (typeof response.message === "string")
		return { errors: [{ message: response.message }] }
	else
		return { errors: response.message }
}