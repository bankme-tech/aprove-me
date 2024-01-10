"use server"

import action from "@/lib/action";
import api from "@/lib/api";
import { Pagination } from "@/types/general";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Payable = {
	id: string;
	value: string;
	emissionDate: string;
}

export const index = action(async (): Promise<Pagination<Payable>> => {
	return api("/integrations/payable").then(t => t.json())
})

export const store = action(async (form) => {
	const value = parseFloat(form.get("value")?.toString()!)
	const emissionDate = new Date(form.get("emissionDate")?.toString()!).toISOString()
	const assignor = form.get("assignor")

	const response = await api("/integrations/payable", {
		method: "post",
		body: JSON.stringify({
			value,
			emissionDate,
			assignor,
		})
	}).then(t => t.json())
	
	if (response.error || response.message === "Unauthorized") {
		if (typeof response.message === "string")
			return { errors: [{ message: response.message }] }
		else
			return { errors: response.message }
	}

	revalidatePath("/payables")
	redirect("/payables")
})

export const show = async (id: string): Promise<{data: Payable}> => {
	return api(`/integrations/payable/${id}`).then(t => t.json())
}

export const update = action(async (form) => {
	const id = form.get("id")
	const value = form.get("value")
	const emissionDate = form.get("emissionDate")
	const assignor = form.get("assignor")

	const response = await api(`/integrations/payable/${id}`, {
		method: "PATCH",
		body: JSON.stringify({
			value,
			emissionDate,
			assignor,
		})
	}).then(t => t.json())
	
	if (response.error || response.message === "Unauthorized") {
		if (typeof response.message === "string")
			return { errors: [{ message: response.message }] }
		else
			return { errors: response.message }
	}

	revalidatePath(`/payables/${id}`)
	redirect(`/payables/${id}`)
})

export const remove = action(async (form) => {
	const id = form.get("id")

	const response = await api(`/integrations/payable/${id}`, {
		method: "delete",
	}).then(t => t.json())
	
	if (response.error || response.message === "Unauthorized") {
		if (typeof response.message === "string")
			return { errors: [{ message: response.message }] }
		else
			return { errors: response.message }
	}

	revalidatePath("/payables")
	redirect("/payables")
})