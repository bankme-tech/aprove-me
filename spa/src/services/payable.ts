import { fetchAPI } from "./fetchAPI";
import { PayableType, AssignorType } from "../types";
import { UUID } from "crypto";

export const createPayable = async (data: { receivableData: PayableType, assignorData: AssignorType }) => {
  const token = localStorage.getItem('accessToken');
  const { receivableData, assignorData } = data;
  if (!receivableData.assignor) {
    const response = await fetchAPI('payable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ receivableData, assignorData })
    })
    return response.json();
  } else {
    const response = await fetchAPI('payable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ receivableData })
    })
    return response.json();
  }
}

export const getPayable = async (id: UUID) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetchAPI(`payable/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  return response.json();
}

export const editPayable = async (receivableData: PayableType) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetchAPI(`payable/${receivableData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(receivableData)
  })
  return response.json();
}

