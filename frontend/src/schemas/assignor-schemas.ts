import * as z from "zod";

export const createAssignorFormSchema = z.object({
    name: z.string().max(140, "Name must be less than 140 characters"),
    document: z.string().max(30, "Document must be less than 30 characters"),
    email: z.string().email().max(140, "Email must be less than 140 characters"),
    phone: z.string().max(20, "Phone must be less than 20 characters"),
});


export type CreateAssignorFormData = z.infer<typeof createAssignorFormSchema>;


export const editAssignorFormSchema = createAssignorFormSchema.extend({
    id: z.string().uuid("Invalid id"),
});

export type EditAssignorFormData = z.infer<typeof editAssignorFormSchema>;