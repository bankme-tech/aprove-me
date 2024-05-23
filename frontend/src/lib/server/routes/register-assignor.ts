'use server'

import { Endpoints } from "@/common/endpoints"
import { ApiParams, Assignor } from "@/common/types"
import { AssignorData } from "@/validations/assignor-validation"
import { revalidateTag } from "next/cache"
import { RedirectType, redirect } from "next/navigation"

export type RegisterAssignorApi = (data: AssignorData, params: ApiParams) => Promise<Assignor>

export const registerAssignor: RegisterAssignorApi = async (data, {token}) => {
    const request = await fetch(Endpoints.NEW_ASSIGNOR, {
        method: 'POST',
        body: JSON.stringify(data),
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
    
    revalidateTag('assignors')

    return response
}