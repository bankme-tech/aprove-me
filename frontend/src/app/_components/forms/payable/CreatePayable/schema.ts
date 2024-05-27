import { z } from "zod";

export const CreatePayableSchema = z.object({
    value: z.number({
        coerce: true,
        message: "Valor inválido",
    }),
    emissionDate: z.date(),
    assignor: z.string(),
});

export type CreatePayableType = z.infer<typeof CreatePayableSchema>;