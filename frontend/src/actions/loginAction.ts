'use client';

import axiosInstance from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  login: z.string(),
  password: z.string(),
})

export default async function login(_: any, formData: FormData) {
  try {
    const data = schema.parse(Object.fromEntries(formData.entries()));
    const { data: res } = await axiosInstance.post<{ token: string }>('/auth', data);

    localStorage.setItem('token', res.token);
    axiosInstance.defaults.headers['authorization'] = `Bearer ${res.token}`;
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return { message: error.errors[0].message };
    }
    if (error instanceof AxiosError) {
      console.log(error)
      return { message: error.response?.data.message };
    }
    return { message: "An internal error occurred" }
  }

  redirect('/');
} 
