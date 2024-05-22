import { z } from 'zod';

export const receivableSchema = z
  .object({
    value: z
      .number({
        message: 'Invalid value',
      })
      .min(0, 'Value must be positive'),
    emissionDate: z.string().datetime({
      offset: true,
      message: 'Invalid emission date',
    }),
    assignorId: z.string().uuid({ message: 'Invalid assignor id' }),
    assignor: z.any().optional(),
  })
  .required({
    value: true,
    emissionDate: true,
    assignorId: true,
  });

export const updateReceivableSchema = z.object({
  value: z
    .number({
      message: 'Invalid value',
    })
    .min(0, 'Value must be positive')
    .optional(),
  emissionDate: z
    .string()
    .datetime({
      message: 'Invalid emission date',
    })
    .optional(),
  assignorId: z
    .string({
      message: 'Invalid assignor id',
    })
    .uuid()
    .optional(),
});
