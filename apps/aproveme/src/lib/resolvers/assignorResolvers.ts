import { Assignor } from "../types";
import { getToken, removeToken } from "../utils";

export const fetchAssignorList = async (): Promise<Assignor[]> => {
  const token = getToken();
  const response = await fetch(`${import.meta.env.VITE_API_URL}assignor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401 && token) {
      removeToken();
    }
    throw new Error(response.statusText);
  }

  return response.json();
};

export const fetchAssignor = async (id: string): Promise<Assignor[]> => {
  const token = getToken();
  const response = await fetch(`${import.meta.env.VITE_API_URL}payable/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401 && token) {
      removeToken();
    }
    throw new Error(response.statusText);
  }

  return response.json();
};
