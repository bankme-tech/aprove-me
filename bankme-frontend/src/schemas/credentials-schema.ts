import { z } from "zod";

export const credentialsSchema = z.object({
  login: z
    .string()
    .min(4, { message: "login must contain at least 4 character(s)" }),
  password: z
    .string()
    .min(4, { message: "password must contain at least 4 character(s)" }),
});

export type CredentialsSchemaType = z.infer<typeof credentialsSchema>;
