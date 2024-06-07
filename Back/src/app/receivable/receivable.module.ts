import { ReceivableProducerModule } from "@/producer/receivable/receivable.producer.module";
import { PrismaModule } from "@/shared/prisma/prisma.module";
import { Module } from "@nestjs/common";
import { AssignorModule } from "../assignor/assignor.module";
import { ReceivableController } from "./receivable.controller";
import { ReceivableRepository } from "./receivable.repository";
import { ReceivableService } from "./receivable.service";

@Module({
    imports: [AssignorModule, ReceivableProducerModule, PrismaModule],
    controllers: [ReceivableController],
    providers: [ReceivableService, ReceivableRepository],
    exports: [ReceivableService]
})
export class ReceivableModule {}
