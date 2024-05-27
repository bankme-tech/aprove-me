import { z } from "zod";

/* eslint-disable prettier/prettier */
export const UpdatePayableByIdInputSchema = z.object({
  value: z
    .number({ invalid_type_error: "value must be a number type", required_error: "value is a required field" })
    .min(0, "value must be greater than or equal to 0"),

  emissionDate: z.string({ invalid_type_error: "emissionDate must be a string type", required_error: "emissionDate is a required field" })
    .date("emissionDate must be a valid date (YYYY-MM-DD)")
    .transform((value) => new Date(value)),

  assignorId: z
    .string({ invalid_type_error: "assignorId must be a string type", required_error: "assignorId is a required field" })
    .uuid("assignorId must be a valid UUID"),
});
/* eslint-enable prettier/prettier */
