import { Module } from "@nestjs/common";
import { PrismaModule } from "src/shared/prisma/prisma.module";
import { AssignorModule } from "../assignor/assignor.module";
import { ReceivableRepository } from "./receivable.repository";
import { ReceivableService } from "./receivable.service";
import { ReceivableController } from "./receivable.controller";

@Module({
    imports: [AssignorModule, PrismaModule],
    controllers: [ReceivableController],
    providers: [ReceivableService, ReceivableRepository],
    exports: [ReceivableService]
})
export class ReceivableModule {}
