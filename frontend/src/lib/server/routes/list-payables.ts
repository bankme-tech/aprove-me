'use server'

import { Endpoints } from "@/common/endpoints"
import { ApiParams, Payable } from "@/common/types"
import { RedirectType, redirect } from "next/navigation"

export type ListPayablesApi = (params: ApiParams) => Promise<Payable[]>

export const listPayables: ListPayablesApi = async ({token}) => {
    const request = await fetch(Endpoints.LIST_PAYABLES, {
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

    return response
}