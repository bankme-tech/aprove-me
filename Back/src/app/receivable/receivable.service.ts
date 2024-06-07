import { ReceivableProducerService } from "@/producer/receivable/receivable.producer.service";
import { HandleHttpError } from "@/shared/utils/handleError";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AssignorService } from "../assignor/assignor.service";
import { AssignorDto } from "../assignor/dto/assignor.dto";
import { CreateReceivableDto } from "./dto/createReceivable.dto";
import { ReceivableDto } from "./dto/receivable.dto";
import { ReceivableListDto } from "./dto/receivableList.dto";
import { SaveReceivableDto } from "./dto/saveReceivable.dto";
import { UpdateReceivableDto } from "./dto/updateReceivable.dto";
import { ReceivableException } from "./exception/receivableException.enum";
import { ReceivableRepository } from "./receivable.repository";

@Injectable()
export class ReceivableService {
    private readonly logger = new Logger(ReceivableService.name);
    private readonly quantityLimitInBatch: number = 10000;

    constructor(
        private readonly repository: ReceivableRepository,
        private readonly assignorService: AssignorService,
        private readonly receivableProducerService: ReceivableProducerService
    ) {}

    public async save(data: CreateReceivableDto): Promise<void> {
        try {
            this.logger.log(`Start service save - Request - ${JSON.stringify(data)}`);
            const assignor = await this.assignorService.getByEmail(data.assignorEmail);
            if (!assignor) throw new HttpException(ReceivableException.ASSIGNOR_EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND);

            const newReceivable = await this.create(data, assignor);

            await this.repository.create(newReceivable);

            this.logger.log("End service save");
        } catch (error) {
            this.logger.error(`Error service save - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async saveBatch(data: CreateReceivableDto[], email: string): Promise<void> {
        try {
            this.logger.log(`Start service saveBatch - Request - ${JSON.stringify({ data, email })}`);
            const quantity = data.length;
            if (quantity > this.quantityLimitInBatch)
                throw new HttpException(ReceivableException.EXCEED_BATCH_LIMIT, HttpStatus.PRECONDITION_REQUIRED);

            await this.receivableProducerService.addToSaveReceivable(data, email);
            this.logger.log("End service saveBatch");
        } catch (error) {
            this.logger.error(`Error service saveBatch - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async getAll(): Promise<ReceivableListDto[]> {
        try {
            this.logger.log("Start service getAll");
            const response = await this.repository.findAll();
            this.logger.log(`End service getAll - Response - ${JSON.stringify(response)}`);
            return response;
        } catch (error) {
            this.logger.error(`Error service getAll - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async getById(id: string): Promise<ReceivableDto> {
        try {
            this.logger.log(`Start service getById - Request - ${JSON.stringify(id)}`);
            if (!id) throw new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);

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
            if (!id) throw new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);

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
            if (!id) throw new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);

            const receivable = await this.repository.findById(id);
            if (!receivable) throw new HttpException(ReceivableException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);

            await this.repository.delete(id);

            this.logger.log("End service delete");
        } catch (error) {
            this.logger.error(`Error service delete - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    private async create(receivable: CreateReceivableDto, assignor: AssignorDto): Promise<SaveReceivableDto> {
        try {
            this.logger.log(`Start service create - Request - ${JSON.stringify({ receivable, assignor })}`);
            const newReceivable = new SaveReceivableDto();
            newReceivable.assignorId = assignor.id;
            newReceivable.emissionDate = new Date(receivable.emissionDate);
            newReceivable.value = Number(receivable.value);
            this.logger.log(`End service create - Response - ${JSON.stringify(newReceivable)}`);
            return newReceivable;
        } catch (error) {
            this.logger.error(`Error service create - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}
