import { Module } from "@nestjs/common";

import { CreateAssignorController } from "./create-assignor.controller";

@Module({ controllers: [CreateAssignorController] })
export class CreateAssignorModule {}
