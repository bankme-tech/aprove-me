import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { HandleHttpError } from "src/shared/utils/handleError";
import { AssignorDto } from "./dto/assignor.dto";
import { CreateAssignorDto } from "./dto/createAssignor.dto";
import { UpdateAssignorDto } from "./dto/updateAssignor.dto";

@Injectable()
export class AssignorService {
    private readonly logger = new Logger(AssignorService.name);

    constructor() {}

    public async create(data: CreateAssignorDto): Promise<void> {
        try {
            this.logger.log(`Start service create - Request - ${JSON.stringify(data)}`);
            const alreadyRegisterEmail = false;
            const alreadyRegisterDocument = false;
            const alreadyRegisterPhone = false;

            if (alreadyRegisterEmail) throw new HttpException("Already exist this email", HttpStatus.CONFLICT);
            if (alreadyRegisterDocument) throw new HttpException("Already exist this document", HttpStatus.CONFLICT);
            if (alreadyRegisterPhone) throw new HttpException("Already exist this phone", HttpStatus.CONFLICT);

            // Create assignor
            this.logger.log("End service create");
        } catch (error) {
            this.logger.error(`Error service create - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async getById(id: string): Promise<AssignorDto> {
        try {
            this.logger.log(`Start service getById - Request - ${JSON.stringify(id)}`);
            const assignor = undefined;
            if (!assignor) throw new HttpException("Id not found", HttpStatus.NOT_FOUND);
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
            const alreadyRegisterEmail = false;
            const alreadyRegisterDocument = false;
            const alreadyRegisterPhone = false;

            if (alreadyRegisterEmail) throw new HttpException("Already exist this email", HttpStatus.CONFLICT);
            if (alreadyRegisterDocument) throw new HttpException("Already exist this document", HttpStatus.CONFLICT);
            if (alreadyRegisterPhone) throw new HttpException("Already exist this phone", HttpStatus.CONFLICT);

            const hasAssignor = true;
            if (!hasAssignor) throw new HttpException("Id not found", HttpStatus.NOT_FOUND);

            // update assignor
            this.logger.log("End service update");
        } catch (error) {
            this.logger.error(`Error service update - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            this.logger.log(`Start service delete - Request - ${JSON.stringify({ id })}`);
            const hasAssignor = true;
            if (!hasAssignor) throw new HttpException("Id not found", HttpStatus.NOT_FOUND);

            // delete assignor
            this.logger.log("End service delete");
        } catch (error) {
            this.logger.error(`Error service delete - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}
