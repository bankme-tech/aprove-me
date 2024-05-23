'use server'

import { Endpoints } from "@/common/endpoints"
import { LoginData } from "@/validations/login-validation"
import { revalidateTag } from "next/cache"
import { RedirectType, redirect } from "next/navigation"

type ResponseData = { accessToken: string }

export type AuthenticateApi = (data: LoginData) => Promise<ResponseData>

export const authenticate: AuthenticateApi = async (data) => {
    const request = await fetch(Endpoints.LOGIN, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', },
        cache: 'no-cache',
    })

    const response = await request.json()
    
    if(!request.ok){
        if(response.error === 'Unauthorized') redirect('/', RedirectType.replace)

        throw new Error(response.message, {cause: response.error})
    }
    
    revalidateTag('assignors')

    return response
}