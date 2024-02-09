'use server';

export const auth = async (login: string, password: string) => {
    const res = await fetch(`${process.env.BASE_URL}/integrations/auth`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({login, password})
    });
    const data = await res.json();
    return data;
}