import { z } from "zod";

export interface Payable {
  _id: string;
  props: {
    value: number;
    assignorId: string;
    emissionDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };
}

export interface FindAllPayables {
  skip: number;
  take: number;
}

export interface FindAllResponse {
  payables: Payable[];
  totalPayables: number;
  totalPages: number;
}

export const playableSchema = z.object({
  assignorId: z.string().uuid(),
  value: z.coerce.number({
    required_error: "Necessário preencher este campo",
    invalid_type_error: "Necessário ser um número",
  }),
  emissionDate: z.date({ message: "Necessário escolher uma data" }),
});

export type PlayableTypes = z.infer<typeof playableSchema>;
