import { z } from "zod";

import { isBrazilianPhoneNumber } from "../../validators/isBrazilianPhoneNumber";
import { isCNPJ } from "../../validators/isCNPJ";
import { isCPF } from "../../validators/isCPF";

/* eslint-disable prettier/prettier */
export const CreatePayableInputSchema = z.object({
  id: z
    .string({ invalid_type_error: "id must be a string type", required_error: "id is a required field" })
    .uuid("id must be a valid UUID"),

  value: z
    .number({ invalid_type_error: "value must be a number type", required_error: "value is a required field" })
    .min(0, "value must be greater than or equal to 0"),

  emissionDate: z.string({ invalid_type_error: "emissionDate must be a string type", required_error: "emissionDate is a required field" })
    .date("emissionDate must be a valid date (YYYY-MM-DD)"),

  assignor: z.object(
    {
      id: z
        .string({ invalid_type_error: "assignor.id must be a string type", required_error: "assignor.id is a required field" })
        .uuid("assignor.id must be a valid UUID"),

      document: z
        .string({ invalid_type_error: "assignor.document must be a string type", required_error: "assignor.document is a required field" })
        .min(1, "assignor.document must be at least 1 character")
        .max(30, "assignor.document must be at most 30 characters")
        .refine((value) => isCPF(value) || isCNPJ(value), "assignor.document must be a valid CPF (000.000.000-00) or a valid CNPJ (00.000.000/0000-00)"),

      email: z
        .string({ invalid_type_error: "assignor.email must be a string type", required_error: "assignor.email is a required field" })
        .min(1, "assignor.email must be at least 1 character")
        .max(140, "assignor.email must be at most 140 characters")
        .email("assignor.email must be a valid email"),

      phone: z
        .string({ invalid_type_error: "assignor.phone must be a string type", required_error: "assignor.phone is a required field" })
        .min(1, "assignor.phone must be at least 1 character")
        .max(20, "assignor.phone must be at most 20 characters")
        .refine((value): value is string => isBrazilianPhoneNumber(value), "assignor.phone must be a valid brazilian phone number [+55 (00) 0 0000-0000]"),

      name: z
        .string({ invalid_type_error: "name must be a string type", required_error: "name is a required field" })
        .min(1, "name must be at least 1 character")
        .max(140, "name must be at most 140 characters")
        .refine((value): value is string => value.trim().length !== value.length, "name must be trimmed"),
    },
    {
      invalid_type_error: "assignor must be a object type",
      required_error: "assignor is a required field",
    }
  ),
});
/* eslint-enable prettier/prettier */
