import { HandleHttpError } from "@/shared/utils/handleError";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AssignorRepository } from "./assignor.repository";
import { AssignorDto } from "./dto/assignor.dto";
import { CreateAssignorDto } from "./dto/createAssignor.dto";
import { UpdateAssignorDto } from "./dto/updateAssignor.dto";
import { AssignorException } from "./exception/assignorException.enum";

@Injectable()
export class AssignorService {
    private readonly logger = new Logger(AssignorService.name);

    constructor(private readonly repository: AssignorRepository) {}

    public async create(data: CreateAssignorDto): Promise<void> {
        try {
            this.logger.log(`Start service create - Request - ${JSON.stringify(data)}`);

            const alreadyRegisterEmail = await this.repository.hasEmail(data.email);
            const alreadyRegisterDocument = await this.repository.hasDocument(data.document);
            const alreadyRegisterPhone = await this.repository.hasPhone(data.phone);

            if (alreadyRegisterEmail)
                throw new HttpException(AssignorException.EMAIL_ALREADY_EXIST, HttpStatus.CONFLICT);
            if (alreadyRegisterDocument)
                throw new HttpException(AssignorException.DOCUMENT_ALREADY_EXIST, HttpStatus.CONFLICT);
            if (alreadyRegisterPhone)
                throw new HttpException(AssignorException.PHONE_ALREADY_EXIST, HttpStatus.CONFLICT);

            await this.repository.create(data);

            this.logger.log("End service create");
        } catch (error) {
            this.logger.error(`Error service create - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async getById(id: string): Promise<AssignorDto> {
        try {
            this.logger.log(`Start service getById - Request - ${JSON.stringify(id)}`);
            const assignor = await this.repository.findById(id);
            if (!assignor) throw new HttpException(AssignorException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);
            this.logger.log(`End service getById - Response - ${JSON.stringify(assignor)}`);
            return assignor;
        } catch (error) {
            this.logger.error(`Error service getById - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async update(data: UpdateAssignorDto, id: string): Promise<void> {
        try {
            this.logger.log(`Start service update - Request - ${JSON.stringify({ ...data, id })}`);

            const alreadyRegisterEmail = data?.email ? await this.repository.hasEmail(data.email) : false;
            const alreadyRegisterDocument = data?.document ? await this.repository.hasDocument(data.document) : false;
            const alreadyRegisterPhone = data?.phone ? await this.repository.hasPhone(data.phone) : false;

            if (alreadyRegisterEmail)
                throw new HttpException(AssignorException.EMAIL_ALREADY_EXIST, HttpStatus.CONFLICT);
            if (alreadyRegisterDocument)
                throw new HttpException(AssignorException.DOCUMENT_ALREADY_EXIST, HttpStatus.CONFLICT);
            if (alreadyRegisterPhone)
                throw new HttpException(AssignorException.PHONE_ALREADY_EXIST, HttpStatus.CONFLICT);

            const assignor = await this.repository.findById(id);
            if (!assignor) throw new HttpException(AssignorException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);

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

            const assignor = await this.repository.findById(id);
            if (!assignor) throw new HttpException(AssignorException.ID_NOT_FOUND, HttpStatus.NOT_FOUND);

            await this.repository.delete(id);

            this.logger.log("End service delete");
        } catch (error) {
            this.logger.error(`Error service delete - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}
