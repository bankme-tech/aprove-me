import { TUser } from '../types/UserTypes'

const URL = 'http://localhost:3000/integrations/auth'

export const LoginApi = async (user: TUser) => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return response.json()
}