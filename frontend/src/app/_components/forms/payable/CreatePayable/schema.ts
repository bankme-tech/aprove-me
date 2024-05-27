import { z } from "zod";

export const CreatePayableSchema = z.object({
    value: z.number(),
    emissionDate: z.date(),
    assignor: z.string(),
});

export type CreatePayableType = z.infer<typeof CreatePayableSchema>;