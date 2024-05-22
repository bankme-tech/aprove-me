"use server"

import { api } from "@/api/api"
import { Assignor } from "@/interfaces/interfaces"
import { CreateAssignorFormData, EditAssignorFormData } from "@/schemas/assignor-schemas"
import { redirect } from "next/navigation"


export async function createAssignor({name, document, email, phone}: CreateAssignorFormData) {
    await api.post<Assignor>('assignor', {name, document, email, phone})
}

export async function editAssignor({id, name, document, email, phone}: EditAssignorFormData) {
    await api.patch<Assignor>(`/assignor/${id}`, {name, document, email, phone})
    redirect(`/assignor/${id}`)
}