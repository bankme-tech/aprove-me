import { z } from "zod";

import { UpsertPermissionInputSchema } from "./upsert-permission-input.schema";

export type UpsertPermissionInputDTO = z.infer<
  typeof UpsertPermissionInputSchema
>;
