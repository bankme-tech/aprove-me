import z from "zod";

import { isBrazilianPhoneNumber } from "../validators/isBrazilianPhoneNumber";
import { isCNPJ } from "../validators/isCNPJ";
import { isCPF } from "../validators/isCPF";

/* eslint-disable prettier/prettier */
export const UpsertAssignorInputSchema = z.object({
  document: z.string().min(1).max(30).refine((value) => isCPF(value) || isCNPJ(value), "document must follow one of these formats: 000.000.000-00 or 00.000.000/0000-00"),
  email: z.string().min(1).max(140).email(),
  phone: z.string().min(1).max(20).refine((value) => isBrazilianPhoneNumber(value), "phone must follow format: +55 (00) 0 0000-0000"),
  name: z.string().trim().min(1).max(140),
});
/* eslint-enable prettier/prettier */
