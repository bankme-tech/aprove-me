import { CreateReceivableDto } from "@/app/receivable/dto/createReceivable.dto";
import { DateUtils } from "@/shared/utils/date";
import { HandleHttpError } from "@/shared/utils/handleError";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { SaveReceivableContract } from "./contract/saveReceivable.contract";

@Injectable()
export class ReceivableProducerService {
    private readonly logger = new Logger(ReceivableProducerService.name);

    constructor(@Inject("SAVE_RECEIVABLE_QUEUE") private readonly saveReceivableQueue: ClientProxy) {}

    public async addToSaveReceivable(receivables: CreateReceivableDto[], email: string): Promise<void> {
        try {
            this.logger.log(`Start service addToSaveReceivable - Response - ${JSON.stringify({ receivables, email })}`);
            const name = DateUtils.today().toLocaleDateString();
            const total = receivables.length;

            for (const receivable of receivables) {
                const request = this.createRequestToSave(receivable, name, email, total);
                this.saveReceivableQueue.emit("save-receivable", request);
            }
            this.logger.log("End service addToSaveReceivable");
        } catch (error) {
            this.logger.error(`Error service addToSaveReceivable - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    private createRequestToSave(
        receivable: CreateReceivableDto,
        name: string,
        email: string,
        total: number
    ): SaveReceivableContract {
        const request = new SaveReceivableContract();
        request.name = name;
        request.total = total;
        request.email = email;
        request.receivable = receivable;
        return request;
    }
}
