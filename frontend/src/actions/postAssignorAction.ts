'use client';

import axiosInstance from "@/api/axiosInstance";
import { z } from "zod";

const schema = z.object({
  name: z.string().max(140, "Name must be less than 140 characters"),
  document: z.string().max(30, "Document must be less than 30 characters"),
  email: z.string().email().max(140, "Email must be less than 140 characters"),
  phone: z.string().max(20, "Phone must be less than 20 characters"),
})

async function createAssignor(_: any, formData: FormData) {
  try {
    const data = schema.parse(Object.fromEntries(formData.entries()));

    await axiosInstance.post("/assignor", data);
    return { message: 'Assignor created successfully' }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const { errors: [first] } = error;
      return { message: first.message }
    }
    return { message: error.message }
  }
}

export default createAssignor;
