import { z } from "zod";

import { UpsertAssignorInputSchema } from "./upsert-assignor-input.schema";

export type UpsertAssignorInputDTO = z.infer<typeof UpsertAssignorInputSchema>;
