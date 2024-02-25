'use client';

import axiosInstance from "@/api/axiosInstance";
import { z } from "zod";

const schema = z.object({
  value: z.coerce.number().gt(0, "Value must be greater than 0"),
  assignorId: z.string().min(1, "Assignor ID is required"),
});

export async function createPayable(_: any, formData: FormData) {
  try {
    const { value, assignorId } = schema.parse({
      value: formData.get('value'),
      assignorId: formData.get('assignorId'),
    });

    await axiosInstance.post('payable', { value, assignorId })
    // revalidatePath('/');
    return { message: 'Payable created successfully' }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const { errors: [first] } = error;
      return { message: first.message }
    }

    return { message: error.message }
  }
}
