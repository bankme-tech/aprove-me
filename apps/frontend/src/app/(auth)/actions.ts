"use server"

import action from "@/lib/action"
import api from "@/lib/api"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * ### Register
 */
export const register = action(async (form: FormData) => {
	const login = form.get("login")
	const password = form.get("password")

	const response = await api("/integrations/auth/signup", {
		method: "post",
		body: JSON.stringify({
			login,
			password,
		})
	}).then(t => t.json())

	// authentication failed
	if (response.error || response.message === "Unauthorized") {
		if (typeof response.message === "string")
			return { errors: [{ message: response.message }] }
		else
			return { errors: response.message }
	}

	// authentication success
	cookies().set("token", response.token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 2_560_000,
	})

	redirect("/")
})

/**
 * ### Login
 */
export const login = action(async (form: FormData) => {
	const login = form.get("login")
	const password = form.get("password")

	const response = await api("/integrations/auth", {
		method: "post",
		body: JSON.stringify({
			login,
			password,
		})
	}).then(t => t.json())

	// authentication failed
	if (response.error || response.message === "Unauthorized") {
		if (typeof response.message === "string")
			return { errors: [{ message: response.message }] }
		else
			return { errors: response.message }
	}

	// authentication success
	cookies().set("token", response.token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 2_560_000,
	})

	redirect("/")
})
