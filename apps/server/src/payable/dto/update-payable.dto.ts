import { z } from 'zod'

export const payableUpdateSchema = z.object({
  value: z.number().min(1),
})

export type PayableUpdateSchema = z.infer<typeof payableUpdateSchema>
