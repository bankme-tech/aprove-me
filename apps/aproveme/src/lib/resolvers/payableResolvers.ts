import { z } from "zod";
import { Payable } from "../types";
import { getToken, removeToken } from "../utils";

export const fetchPayable = async (id: string): Promise<Payable> => {
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

export const updatePayable = async ({ id, emissionDate, value }: Payable) => {
  const token = getToken();
  const response = await fetch(`${import.meta.env.VITE_API_URL}payable/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value,
      emissionDate,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const fetchPayableList = async (): Promise<Payable[]> => {
  const token = getToken();
  const response = await fetch(`${import.meta.env.VITE_API_URL}payable`, {
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

export const deletePayable = async (id: string) => {
  const token = getToken();
  const response = await fetch(`${import.meta.env.VITE_API_URL}payable/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status === 404) {
    throw new Error("Payable not found");
  }

  return;
};

export const createPayableSchema = z.object({
  value: z.coerce.number().min(0.1),
  emissionDate: z.string().date(),
  assignorId: z.string({ required_error: "Choose an assignor" }).uuid(),
});

export type CreatePayableFormData = z.infer<typeof createPayableSchema>;

export const createPayable = async (body: CreatePayableFormData) => {
  const token = getToken();
  const response = await fetch(`${import.meta.env.VITE_API_URL}payable`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};
