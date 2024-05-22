import { Module } from "@nestjs/common";

import { FindPayableByIdController } from "./find-payable-by-id.controller";

@Module({ controllers: [FindPayableByIdController] })
export class FindPayableByIdModule {}
