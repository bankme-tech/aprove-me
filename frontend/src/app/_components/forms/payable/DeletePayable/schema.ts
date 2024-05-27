import { z } from 'zod';

export const DeletePayableSchema = z.object({
    confirm: z.string().includes("confirmar").toLowerCase(),
});

export type DeletePayableType = z.infer<typeof DeletePayableSchema>;