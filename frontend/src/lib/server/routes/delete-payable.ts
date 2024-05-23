'use server'

import { Endpoints } from "@/common/endpoints"
import { ApiParams } from "@/common/types"
import { revalidateTag } from "next/cache"
import { RedirectType, redirect } from "next/navigation"

export type DeletePayableApi = (id: string, params: ApiParams) => Promise<void>

export const deletePayable: DeletePayableApi = async (id, {token})=> {
    const request = await fetch(`${Endpoints.DELETE_PAYABLE}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        cache: 'no-cache'
    })

    
    if(!request.ok){
        const response = await request.json()

        if(response.error === 'Unauthorized') redirect('/', RedirectType.replace)

        throw new Error(response.message)
    }
    
    revalidateTag('payables')
    revalidateTag(`payables.${id}`)

}