import { z } from "zod"

export const UpdatePayableSchema = z.object({
    value: z.number({
        coerce: true,
        message: "Valor inválido",
    }),
    emissionDate: z.date(),
    assignor: z.string(),
});

export type UpdatePayableType = z.infer<typeof UpdatePayableSchema>;