import { z } from "zod";

import { CreatePayableInputSchema } from "./create-payable-input.schema";

export type CreatePayableInputDTO = z.infer<typeof CreatePayableInputSchema>;
