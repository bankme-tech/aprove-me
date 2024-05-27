import { z } from "zod";

export const CreateAssignorSchema = z.object({
    document: z.string().min(1, "O campo é obrigatório"),
    email: z.string().min(1, "O campo é obrigatório").email("E-mail inválido"),
    phone: z.string().min(1, "O campo é obrigatório"),
    name: z.string().min(1, "O campo é obrigatório")
});

export type CreateAssignorType = z.infer<typeof CreateAssignorSchema>;