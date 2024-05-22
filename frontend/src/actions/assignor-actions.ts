"use server"

import { api } from "@/api/api"
import { Assignor } from "@/interfaces/interfaces"
import { CreateAssignorFormData, EditAssignorFormData } from "@/schemas/assignor-schemas"
import { redirect } from "next/navigation"


export async function createAssignor({name, document, email, phone}: CreateAssignorFormData, token: string) {
    await api.post<Assignor>('assignor', {name, document, email, phone}, {headers: {Authorization: `Bearer ${token}`}} )
}

export async function editAssignor({id, name, document, email, phone}: EditAssignorFormData, token: string) {
    await api.patch<Assignor>(`/assignor/${id}`, {name, document, email, phone}, {headers: {Authorization: `Bearer ${token}`}} )
    redirect(`/assignor/${id}`)
}