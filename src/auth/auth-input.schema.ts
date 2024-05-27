import { z } from "zod";

export const AuthInputSchema = z.object({
  login: z.string({
    invalid_type_error: "login must be a string type",
    required_error: "login is a required field",
  }),
  password: z.string({
    invalid_type_error: "password must be a string type",
    required_error: "password is a required field",
  }),
});
