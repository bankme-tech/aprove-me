'use server'

import { Endpoints } from "@/common/endpoints"
import { ApiParams, Payable } from "@/common/types"
import { revalidateTag } from "next/cache"
import { RedirectType, redirect } from "next/navigation"

type RequestData = {
    value: number
    emissionDate: string
    assignor: string
}

export type RegisterPayableApi = (data: RequestData, params: ApiParams) => Promise<Payable>

export const registerPayable: RegisterPayableApi = async (data, {token}) => {
    const request = await fetch(Endpoints.NEW_PAYABLE, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        next: { tags: ['payables'] }
    })

    const response = await request.json()

    if(!request.ok){
        if(response.error === 'Unauthorized') redirect('/', RedirectType.replace)

        throw new Error(response.message, {cause: response.error})
    }
    
    revalidateTag('payables')

    return response
}