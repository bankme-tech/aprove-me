import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ReceivableService } from "./receivable.service";
import {  CreateReceivableDTO } from "./createReceivableDTO";

@Controller('integrations/payable')
export class ReceivableController {
    constructor(private readonly receivableService: ReceivableService) {}

    @Get()
    getAllPayable(): string {
        return this.receivableService.getAllPayable();
    }

    @Post()
    @HttpCode(201)
    async create(@Body() createReceivableDTO: CreateReceivableDTO) {
        const createdReceivable = await this.receivableService.create(createReceivableDTO);
        console.log(createdReceivable);
        
        return createdReceivable;
    }
}