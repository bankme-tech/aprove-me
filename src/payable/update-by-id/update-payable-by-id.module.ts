import { Module } from "@nestjs/common";

import { UpdatePayableByIdController } from "./update-payable-by-id.controller";

@Module({ controllers: [UpdatePayableByIdController] })
export class UpdatePayableByIdModule {}
