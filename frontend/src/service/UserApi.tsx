import { TUser } from '../types/UserTypes'

const URL_LOGIN = 'http://localhost:3000/integrations/auth'
const URL_USER = 'http://localhost:3000/integrations/users'
const URL_PROFILE = 'http://localhost:3000/integrations/profile'
const TOKEN_STORAGED = localStorage.getItem('token')

export const CreateUserApi = async (user: TUser) => {
	const response = await fetch(URL_USER, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
	return response.json()
}

export const LoginApi = async (user: TUser) => {
	const response = await fetch(URL_LOGIN, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
	return response.json()
}

export const GetProfileApi = async (token:string) => {
	const response = await fetch(URL_PROFILE, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	return response.json()
}

export const GetUsersApi = async () => {
	const response = await fetch(URL_USER, {
		headers: {
			'Authorization': `Bearer ${TOKEN_STORAGED}`
			}
		}
	)
	return response.json()
}

export const GetUserByIdApi = async (id: number) => {
	const response = await fetch(`${URL_USER}/${id}`, {
		headers: {
			'Authorization': `Bearer ${TOKEN_STORAGED}`
		}
	
	})
	return response.json()
}

export const GetUserByLoginApi = async (login: string) => {
	const response = await fetch(`${URL_USER}/search/login?login=${login}`, {
		headers: {
			'Authorization': `Bearer ${TOKEN_STORAGED}`
		}
	
	})
	return response.json()
}

export const UpdateUserApi = async (user: TUser) => {
	const response = await fetch(`${URL_USER}/${user.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${TOKEN_STORAGED}`
		},
		body: JSON.stringify(user)
	})
	return response.json()
}

export const DeleteUserApi = async (id: number) => {
	const response = await fetch(`${URL_USER}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${TOKEN_STORAGED}`
		}
	})
	return response.json()
}

