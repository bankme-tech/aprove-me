'use server';
import axiosInstance from "@/api/axiosInstance";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  id: z.string().uuid("Invalid id"),
  name: z.string().max(140, "Name must be less than 140 characters"),
  document: z.string().max(30, "Document must be less than 30 characters"),
  email: z.string().email().max(140, "Email must be less than 140 characters"),
  phone: z.string().max(20, "Phone must be less than 20 characters"),
})

export default async function editAssignor(_: any, formData: FormData) {
  try {
    const data = schema.parse(Object.fromEntries(formData.entries()));
    await axiosInstance.patch(`/assignor/${data.id}`, data);
    revalidatePath(`/assignor/${data.id}`)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const { errors: [first] } = error;
      return { message: first.message }
    }
    return { message: error.message }
  }
  redirect(`/assignor/${formData.get('id')}`)
}
