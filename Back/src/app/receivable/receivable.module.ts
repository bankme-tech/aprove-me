import { Module } from "@nestjs/common";
import { ReceivableService } from "./receivable.service";

@Module({
    imports: [],
    providers: [ReceivableService],
    exports: [ReceivableService]
})
export class ReceivableModule {}
