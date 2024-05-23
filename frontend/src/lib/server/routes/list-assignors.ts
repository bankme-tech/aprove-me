'use server'

import { Endpoints } from "@/common/endpoints"
import { ApiParams, Assignor } from "@/common/types"
import { RedirectType, redirect } from "next/navigation"

export type ListAssignorsApi = (params: ApiParams) => Promise<Assignor[]>

export const listAssignors: ListAssignorsApi = async ({token}) => {
    const request = await fetch(Endpoints.LIST_ASSIGNORS, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        next: { tags: ['assignors'] }
    })

    const response = await request.json()

    if(!request.ok){
        if(response.error === 'Unauthorized') redirect('/', RedirectType.replace)

        throw new Error(response.message, {cause: response.error})
    }

    return response
}