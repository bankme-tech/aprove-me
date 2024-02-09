'use server';

export const getAssignors = async (token: string) => {
    const res = await fetch(`${process.env.BASE_URL}/integrations/assignor`, {
        headers: {
            'Authentication': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    const data = await res.json();
    return data;
}