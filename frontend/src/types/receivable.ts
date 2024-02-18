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

export interface Receivable {
  id: string;
  assignor_id: string;
  emission_date: Date;
  value: number;
  created_at: Date;
  deleted_at: Date | null;
  updated_at: Date;
}
