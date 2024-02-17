import { BASE_URL } from "@/contants"

export const signInRequest = async ({ login, password }: {
    login: string, password: string
}): Promise<{ access_token: string, statusCode: number, message: string, error: string }> => {
    const res = await fetch(`${BASE_URL}/integrations/auth`, {
        headers: {
            'Content-Type': 'application/json' 
        },
        method: 'POST',
        body: JSON.stringify({ login, password })
    });
    return await res.json();
}