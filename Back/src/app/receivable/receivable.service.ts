import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { HandleHttpError } from "src/shared/utils/handleError";
import { CreateReceivableDto } from "./dto/createReceivable.dto";
import { ReceivableDto } from "./dto/receivable.dto";
import { UpdateReceivableDto } from "./dto/updateReceivable.dto";

@Injectable()
export class ReceivableService {
    private readonly logger = new Logger(ReceivableService.name);

    constructor() {}

    public async create(data: CreateReceivableDto): Promise<void> {
        try {
            this.logger.log(`Start service create - Request - ${JSON.stringify(data)}`);
            // search assignor by id
            const assignor = undefined;
            if (!assignor) throw new HttpException("Assignor id not found", HttpStatus.NOT_FOUND);

            // Create receivable
            this.logger.log("End service create");
        } catch (error) {
            this.logger.error(`Error service create - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async getById(id: string): Promise<ReceivableDto> {
        try {
            this.logger.log(`Start service getById - Request - ${JSON.stringify(id)}`);
            const receivable = undefined;
            if (!receivable) throw new HttpException("Id not found", HttpStatus.NOT_FOUND);
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
            const hasReceivable = true;
            if (!hasReceivable) throw new HttpException("Id not found", HttpStatus.NOT_FOUND);

            // update receivable
            this.logger.log("End service update");
        } catch (error) {
            this.logger.error(`Error service update - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            this.logger.log(`Start service delete - Request - ${JSON.stringify({ id })}`);
            const hasReceivable = true;
            if (!hasReceivable) throw new HttpException("Id not found", HttpStatus.NOT_FOUND);

            // delete receivable
            this.logger.log("End service delete");
        } catch (error) {
            this.logger.error(`Error service delete - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}
