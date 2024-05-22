"use client"

import { api } from "@/api/api"
import { Payable } from "@/interfaces/interfaces"
import { CreatePayableFormData } from "@/schemas/payable-schemas"

export async function createPayable({assignorId, value}: CreatePayableFormData, token: string) {
    await api.post<Payable>('payable', {value, assignorId}, {headers: {Authorization: `Bearer ${token}`}} )
}