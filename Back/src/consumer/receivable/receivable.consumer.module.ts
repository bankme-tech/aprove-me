import { ReceivableModule } from "@/app/receivable/receivable.module";
import { EmailModule } from "@/provider/email/email.module";
import { Module } from "@nestjs/common";
import { ReceivableConsumerController } from "./receivable.consumer.controller";
import { ReceivableTrackerService } from "./receivable.tracker.service";

@Module({
    imports: [EmailModule, ReceivableModule],
    controllers: [ReceivableConsumerController],
    providers: [ReceivableTrackerService],
    exports: [ReceivableTrackerService]
})
export class ReceivableConsumerModule {}
