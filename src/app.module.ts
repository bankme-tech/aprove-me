import { Module } from "@nestjs/common";
import { CreatePayableController } from "./create-payable.controller";

@Module({ controllers: [CreatePayableController] })
export class AppModule {}
