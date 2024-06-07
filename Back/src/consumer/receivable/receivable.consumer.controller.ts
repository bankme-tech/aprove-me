import { ReceivableService } from "@/app/receivable/receivable.service";
import { EmailService } from "@/provider/email/email.service";
import { ReportBatchTemplate } from "@/provider/email/templates/ReportBatch";
import { Controller, Logger } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { ReceivableContract } from "./contract/receivable.contract";
import { ReceivableTrackerService } from "./receivable.tracker.service";

@Controller()
export class ReceivableConsumerController {
    private readonly logger = new Logger(ReceivableConsumerController.name);
    private readonly subjectEmail = "Relatórios de recebíveis processados em lote";
    private readonly template = ReportBatchTemplate;

    constructor(
        private readonly emailService: EmailService,
        private readonly receivableService: ReceivableService,
        private readonly receivableTrackerService: ReceivableTrackerService
    ) {}

    @EventPattern("save-receivable")
    public async saveReceivable(@Payload() payload: ReceivableContract): Promise<void> {
        if (!this.receivableTrackerService.hasBatch(payload.name)) {
            this.receivableTrackerService.startBatch(payload.name, payload.total);
        }

        try {
            this.logger.log(`Start service saveReceivable - Response - ${JSON.stringify({ payload })}`);
            await this.receivableService.save(payload.receivable);
            this.receivableTrackerService.incrementSuccess(payload.name);
            this.logger.log("End service saveReceivable");
        } catch (error) {
            this.receivableTrackerService.incrementFailure(payload.name);
            this.logger.error(`Error service saveReceivable - Error - ${JSON.stringify(error)}`);
        } finally {
            if (this.receivableTrackerService.isBatchComplete(payload.name)) {
                const messageSuccess = this.receivableTrackerService.getBatchSuccess(payload.name);
                const messageFailure = this.receivableTrackerService.getBatchFailure(payload.name);
                const total = payload.total;

                await this.emailService.sendMail({
                    to: payload.email,
                    subject: this.subjectEmail,
                    template: this.template,
                    data: { messageSuccess, messageFailure, total }
                });
                this.receivableTrackerService.clearBatch(payload.name);
            }
        }
    }
}
