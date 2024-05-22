import { Module } from "@nestjs/common";

import { FindAssignorByIdController } from "./find-assignor-by-id.controller";

@Module({ controllers: [FindAssignorByIdController] })
export class FindAssignorByIdModule {}
