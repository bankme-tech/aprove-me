import * as z from "zod";

export const authFormSchema = z.object({
    login: z.string().min(1, { message: "Field cannot be null" }),
    password: z.string().min(1, { message: "Field cannot be null" }),
});

export type AuthFormData = z.infer<typeof authFormSchema>;