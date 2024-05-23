'use server'

import { Endpoints } from "@/common/endpoints"
import { ApiParams, Assignor } from "@/common/types"
import { RedirectType, redirect } from "next/navigation"

export type ListAssignorByIdApi = (id: string, params: ApiParams) => Promise<Assignor>

export const listAssignorById: ListAssignorByIdApi = async (id, {token}) => {
    const request = await fetch(`${Endpoints.LIST_ASSIGNOR_BY_ID}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        next: { tags: [`assignors.${id}`] }
    })

    const response = await request.json()

    if(!request.ok){
        if(response.error === 'Unauthorized') redirect('/', RedirectType.replace)

        throw new Error(response.message, {cause: response.error})
    }

    return response
}