"use server"

import { api } from "@/api/api"
import { Assignor } from "@/interfaces/interfaces"
import { CreateAssignorFormData } from "@/schemas/assignor-schemas"
import { CreatePayableFormData } from "@/schemas/payable-schemas"

export async function createAssignor({name, document, email, phone}: CreateAssignorFormData) {
    await api.post<Assignor>('assignor', {name, document, email, phone})
}