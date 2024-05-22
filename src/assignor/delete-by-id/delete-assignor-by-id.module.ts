import { Module } from "@nestjs/common";

import { DeleteAssignorByIdController } from "./delete-assignor-by-id.controller";

@Module({ controllers: [DeleteAssignorByIdController] })
export class DeleteAssignorByIdModule {}
