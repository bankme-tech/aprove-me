'use server'

import { Endpoints } from "@/common/endpoints"
import { ApiParams, Payable } from "@/common/types"
import { revalidateTag } from "next/cache"
import { RedirectType, redirect } from "next/navigation"

export type UpdatePayableApi = (data: Payable, params: ApiParams) => Promise<Payable>

export const updatePayable: UpdatePayableApi = async (data, {token}) =>{
    const request = await fetch(`${Endpoints.UPDATE_PAYABLE}/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

    const response = await request.json()

    if(!request.ok){
        if(response.error === 'Unauthorized') redirect('/', RedirectType.replace)

        throw new Error(response.message, {cause: response.error})
    }
    
    revalidateTag('payables')
    revalidateTag(`payables.${data.id}`)

    return response
}