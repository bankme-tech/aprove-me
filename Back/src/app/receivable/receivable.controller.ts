import { CurrentUser } from "@/authentication/auth/decorators/currentUser.decorator";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { CreateReceivableDto } from "./dto/createReceivable.dto";
import { UpdateReceivableDto } from "./dto/updateReceivable.dto";
import { ReceivableService } from "./receivable.service";

@Controller("integrations/payable")
export class ReceivableController {
    private readonly logger = new Logger(ReceivableController.name);

    constructor(private readonly service: ReceivableService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() data: CreateReceivableDto) {
        this.logger.log("Start method save");
        return await this.service.save(data);
    }

    @Post("batch")
    @HttpCode(HttpStatus.CREATED)
    async saveBatch(@Body() data: CreateReceivableDto[], @CurrentUser("login") email: string) {
        this.logger.log("Start method saveBatch");
        return await this.service.saveBatch(data, email);
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
    async update(@Param("id") id: string, @Body() data: UpdateReceivableDto) {
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
