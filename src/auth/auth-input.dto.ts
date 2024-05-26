import { z } from "zod";

import { AuthInputSchema } from "./auth-input.schema";

export type AuthInputDTO = z.infer<typeof AuthInputSchema>;
