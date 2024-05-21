import { z } from "zod";

const dateSchema = z.coerce.date();

export const payableSchema = z.object({
  value: z.coerce.number(),
  emissionDate: z.string().refine(
    (arg) => {
      const isValid = dateSchema.safeParse(arg);
      if (isValid.success) {
        return true;
      }
      return false;
    },
    { message: "invalid date" }
  ),
  assignorId: z.string().uuid(),
});
