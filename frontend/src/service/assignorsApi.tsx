import { TAssignors } from '../types/AssignorsType'

const URL = 'http://localhost:3000/integrations/assignor'
const TOKEN_STORAGED = localStorage.getItem('token')

export const CreateAssignorApi = async (data: TAssignors) => {
  const response = await fetch(URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN_STORAGED}`
      },
      body: JSON.stringify(data)
    }
  )
  return response.json()
}

export const GetAllAssignorsApi = async () => {
  const response = await fetch(URL,
    {
      headers: {
        'Authorization': `Bearer ${TOKEN_STORAGED}`
      }
    }
  )
  return response.json()
}

export const GetAssignorByIdApi = async (id: string) => {
  const response = await fetch(`${URL}/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${TOKEN_STORAGED}`
      }
    }
  )
  return response.json()
}

export const UpdateAssignorApi = async (id: number, data: TAssignors) => {
  const response = await fetch(`${URL}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN_STORAGED}`
      },
      body: JSON.stringify(data)
    }
  )
  return response.json()
}

export const DeleteAssignorApi = async (id: number) => {
  const response = await fetch(`${URL}/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${TOKEN_STORAGED}`
      }
    }
  )
  return response.json()
}
