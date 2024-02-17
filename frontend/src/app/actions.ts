'use server';

import { signInRequest } from "@/services/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async ({ login, password }: {
    login: string, password: string
}) => {
    const { error, statusCode, message, access_token } = await signInRequest({ login, password });

    if (error) {
        return message
    }

    if (statusCode === 401) {
        return [message];
    }

    if (access_token) {
        cookies().set('bankme.token', access_token);

        redirect('/assignors');
    }
}