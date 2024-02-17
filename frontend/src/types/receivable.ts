import { z } from 'zod';

export const receivableSchema = z.object({
  assignor_id: z.string({
    required_error: 'Informe o cedente',
  }),
  emission_date: z.date({
    required_error: 'A data de emissão é obrigatória',
  }),
  value: z.coerce.number(),
});

export type ReceivableSchema = z.infer<typeof receivableSchema>;
