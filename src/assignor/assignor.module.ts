import { Module } from "@nestjs/common";

import { CreateAssignorModule } from "./create/create-assignor.module";
import { DeleteAssignorByIdModule } from "./delete-by-id/delete-assignor-by-id.module";
import { FindAssignorByIdModule } from "./find-by-id/find-assignor-by-id.module";
import { UpdateAssignorByIdModule } from "./update-by-id/update-assignor-by-id.module";

@Module({
  imports: [
    FindAssignorByIdModule,
    UpdateAssignorByIdModule,
    DeleteAssignorByIdModule,
    CreateAssignorModule,
  ],
})
export class AssignorModule {}
