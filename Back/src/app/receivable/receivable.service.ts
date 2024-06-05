import { HandleHttpError } from "@/shared/utils/handleError";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AssignorService } from "../assignor/assignor.service";
import { CreateReceivableDto } from "./dto/createReceivable.dto";
import { ReceivableDto } from "./dto/receivable.dto";
import { UpdateReceivableDto } from "./dto/updateReceivable.dto";
import { ReceivableException } from "./exception/receivableException.enum";
import { ReceivableRepository } from "./receivable.repository";

@Injectable()
export class ReceivableService {
    private readonly logger = new Logger(ReceivableService.name);

    constructor(private readonly repository: ReceivableRepository, private readonly assignorService: AssignorService) {}

    public async create(data: CreateReceivableDto): Promise<void> {
        try {
            this.logger.log(`Start service create - Request - ${JSON.stringify(data)}`);

            const assignorExists = await this.assignorService.getById(data.assignorId);
            if (!assignorExists)
                throw new HttpException(ReceivableException.ASSIGNOR_ID_NOT_FOUND, HttpStatus.NOT_FOUND);

            await this.repository.create(data);

            this.logger.log("End service create");
        } catch (error) {
            this.logger.error(`Error service create - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async getById(id: string): Promise<ReceivableDto> {
        try {
            this.logger.log(`Start service getById - Request - ${JSON.stringify(id)}`);
            const receivable = await this.repository.findById(id);
            if (!receivable) throw new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);
            this.logger.log(`End service getById - Response - ${JSON.stringify(receivable)}`);
            return receivable;
        } catch (error) {
            this.logger.error(`Error service getById - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async update(data: UpdateReceivableDto, id: string): Promise<void> {
        try {
            this.logger.log(`Start service update - Request - ${JSON.stringify({ ...data, id })}`);
            const receivable = await this.repository.findById(id);
            if (!receivable) throw new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);

            await this.repository.update(id, data);

            this.logger.log("End service update");
        } catch (error) {
            this.logger.error(`Error service update - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            this.logger.log(`Start service delete - Request - ${JSON.stringify({ id })}`);
            const receivable = await this.repository.findById(id);
            if (!receivable) throw new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);

            await this.repository.delete(id);

            this.logger.log("End service delete");
        } catch (error) {
            this.logger.error(`Error service delete - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}
