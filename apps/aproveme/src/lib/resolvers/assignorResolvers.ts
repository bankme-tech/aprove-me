import { z } from "zod";
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

export const fetchAssignor = async (id: string): Promise<Assignor> => {
  const token = getToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}assignor/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401 && token) {
      removeToken();
    }
    throw new Error(response.statusText);
  }

  return response.json();
};

export const createAssignorSchema = z.object({
  document: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .min(11, "invalid phone number")
    .max(11, "invalid phone number"),
  name: z.string(),
});
export type CreateAssignorFormData = z.infer<typeof createAssignorSchema>;

export const createAssignor = async (
  body: CreateAssignorFormData
): Promise<Assignor> => {
  const token = getToken();
  const response = await fetch(`${import.meta.env.VITE_API_URL}assignor`, {
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
