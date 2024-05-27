import { z } from "zod";

import { UpdatePayableByIdInputSchema } from "./update-payable-by-id-input.schema";

export type UpdatePayableByIdInputDTO = z.infer<
  typeof UpdatePayableByIdInputSchema
>;
