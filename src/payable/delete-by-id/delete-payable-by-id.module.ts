import { Module } from "@nestjs/common";

import { DeletePayableByIdController } from "./delete-payable-by-id.controller";

@Module({ controllers: [DeletePayableByIdController] })
export class DeletePayableByIdModule {}
