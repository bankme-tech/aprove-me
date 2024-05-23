'use server'

import { Endpoints } from "@/common/endpoints"
import { ApiParams, Assignor, Payable } from "@/common/types"
import { RedirectType, redirect } from "next/navigation"

type PayableWithAssignor = Payable & { assignor: Assignor }

export type ListPayableByIdApi = (id: string, params: ApiParams) => Promise<PayableWithAssignor>

export const listPayableById: ListPayableByIdApi = async (id, {token}) => {
    const request = await fetch(`${Endpoints.LIST_PAYABLE_BY_ID}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        next: { tags: [`payables.${id}`] },
    })

    
    const response = await request.json()

    if(!request.ok){
        if(response.error === 'Unauthorized') redirect('/', RedirectType.replace)

        throw new Error(response.message, {cause: response.error})
    }

    return response
}