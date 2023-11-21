import { Module } from "@nestjs/common";
import { PayableController } from "./payable.controller";
import { PayableRepository } from "./payable.repository";

@Module({
    controllers: [PayableController],
    providers: [PayableRepository],
})

export class PayableModule { }