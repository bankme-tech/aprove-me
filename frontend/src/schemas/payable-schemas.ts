import * as z from "zod";

export const createPayableFormSchema = z.object({
    value: z.coerce.number().gt(0, "Value must be greater than 0"),
    assignorId: z.string().min(1, "You must provide an assignor"),
});

export type CreatePayableFormData = z.infer<typeof createPayableFormSchema>;