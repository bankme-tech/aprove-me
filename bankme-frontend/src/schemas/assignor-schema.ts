import { z } from "zod";

export const assignorSchema = z.object({
  document: z.string().min(1, { message: "document is required" }).max(30),
  email: z.string().email().max(140),
  phone: z.string().min(1, { message: "phone is required " }).max(20),
  name: z.string().min(1, { message: "name is required" }).max(140),
});
