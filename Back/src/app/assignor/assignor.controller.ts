import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { AssignorService } from "./assignor.service";
import { CreateAssignorDto } from "./dto/createAssignor.dto";
import { UpdateAssignorDto } from "./dto/updateAssignor.dto";

@Controller("integrations/assignor")
export class AssignorController {
    private readonly logger = new Logger(AssignorController.name);

    constructor(private readonly service: AssignorService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateAssignorDto) {
        this.logger.log("Start method create");
        return await this.service.create(data);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        this.logger.log("Start method getAll");
        return await this.service.getAll();
    }

    @Get("by-id")
    @HttpCode(HttpStatus.OK)
    async getById(@Query("id") id: string) {
        this.logger.log("Start method getById");
        return await this.service.getById(id);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    async update(@Param("id") id: string, @Body() data: UpdateAssignorDto) {
        this.logger.log("Start method update");
        return await this.service.update(data, id);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param("id") id: string) {
        this.logger.log("Start method delete");
        return await this.service.delete(id);
    }
}
