import { z } from "zod";

import { isBrazilianPhoneNumber } from "../validators/isBrazilianPhoneNumber";
import { isCNPJ } from "../validators/isCNPJ";
import { isCPF } from "../validators/isCPF";

/* eslint-disable prettier/prettier */
export const UpsertAssignorInputSchema = z.object({
  document: z
    .string({ invalid_type_error: "document must be a string type", required_error: "document is a required field" })
    .min(1, "document must be at least 1 character")
    .max(30, "document must be at most 30 characters")
    .refine((value) => isCPF(value) || isCNPJ(value), "document must be a valid CPF (000.000.000-00) or a valid CNPJ (00.000.000/0000-00)"),

  email: z
    .string({ invalid_type_error: "email must be a string type", required_error: "email is a required field" })
    .min(1, "email must be at least 1 character")
    .max(140, "email must be at most 140 characters")
    .email("email must be a valid email"),

  phone: z
    .string({ invalid_type_error: "phone must be a string type", required_error: "phone is a required field" })
    .min(1, "phone must be at least 1 character")
    .max(20, "phone must be at most 20 characters")
    .refine((value): value is string => isBrazilianPhoneNumber(value), "phone must follow format: +55 (00) 0 0000-0000"),

  name: z
    .string({ invalid_type_error: "name must be a string type", required_error: "name is a required field" })
    .min(1, "name must be at least 1 character")
    .max(140, "name must be at most 140 characters")
    .refine((value): value is string => value.trim().length !== value.length, "name must be trimmed"),
});
/* eslint-enable prettier/prettier */
