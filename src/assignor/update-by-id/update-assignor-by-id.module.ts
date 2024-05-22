import { Module } from "@nestjs/common";

import { UpdateAssignorByIdController } from "./update-assignor-by-id.controller";

@Module({ controllers: [UpdateAssignorByIdController] })
export class UpdateAssignorByIdModule {}
