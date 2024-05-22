"use server"

import { api } from "@/api/api"
import { Payable } from "@/interfaces/interfaces"
import { CreatePayableFormData } from "@/schemas/payable-schemas"

export async function createPayable({assignorId, value}: CreatePayableFormData) {
    await api.post<Payable>('payable', {value, assignorId})
}