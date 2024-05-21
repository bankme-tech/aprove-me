import { z } from "zod";

export interface Assignor {
  _id: string;
  props: {
    document: string;
    email: string;
    phone: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };
}

export interface getAllAssignorResponse {
  assignors: Assignor[];
}

export const assignorSchema = z.object({
  name: z
    .string()
    .min(3, "tamanho minimo de 3 caracteres")
    .max(140, "Tamanho máximo excedido"),
  email: z.string().email().max(140, "Tamanho máximo excedido"),
  document: z
    .string()
    .min(3, "tamanho minimo de 3 caracteres")
    .max(30, "tamanho máximo excedido"),
  phone: z
    .string()
    .min(3, "tamanho minimo de 3 caracteres")
    .max(20, "tamanho máximo excedido"),
});

export type AssignorTypes = z.infer<typeof assignorSchema>;
