"use server"

import action from "@/lib/action";
import api from "@/lib/api";
import { Pagination } from "@/types/general";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Assignor = {
	id: string;
	document: string;
	email: string;
	phone: string;
	name: string;
}

export const index = async (params: Partial<Pagination> & { q?: string }): Promise<Pagination<Assignor>> => {
	const query = new URLSearchParams(params as Record<string, string>)

	return api("/integrations/assignor?" + query.toString()).then(t => t.json())
}

export const store = action(async (form) => {
	const name = form.get("name")
	const email = form.get("email")
	const phone = form.get("phone")
	const document = form.get("document")

	const response = await api("/integrations/assignor", {
		method: "post",
		body: JSON.stringify({
			name,
			email,
			phone,
			document,
		})
	}).then(t => t.json())
	
	if (response.error || response.message === "Unauthorized") {
		if (typeof response.message === "string")
			return { errors: [{ message: response.message }] }
		else
			return { errors: response.message }
	}

	revalidatePath("/assignors")
	redirect("/assignors")
})

export const show = async (id: string): Promise<{data: Assignor}> => {
	return api(`/integrations/assignor/${id}`).then(t => t.json())
}

export const update = action(async (form) => {
	const id = form.get("id")
	const name = form.get("name")
	const email = form.get("email")
	const phone = form.get("phone")
	const document = form.get("document")

	const response = await api(`/integrations/assignor/${id}`, {
		method: "PATCH",
		body: JSON.stringify({
			name,
			email,
			phone,
			document,
		})
	}).then(t => t.json())
	
	if (response.error || response.message === "Unauthorized") {
		if (typeof response.message === "string")
			return { errors: [{ message: response.message }] }
		else
			return { errors: response.message }
	}

	revalidatePath(`/assignors/${id}`)
	redirect(`/assignors/${id}`)
})

export const remove = action(async (form) => {
	const id = form.get("id")

	const response = await api(`/integrations/assignor/${id}`, {
		method: "delete",
	}).then(t => t.json())
	
	if (response.error || response.message === "Unauthorized") {
		if (typeof response.message === "string")
			return { errors: [{ message: response.message }] }
		else
			return { errors: response.message }
	}

	revalidatePath("/assignors")
	redirect("/assignors")
})