import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PayableService } from "./payable.service";
import { Payable } from "./payable.model";

@Controller()
export class PayableController {
    constructor(private readonly payableService: PayableService) { }

    @Get()
    async getPayables() {
        return await this.payableService.getAllPayables();
    }

    @Get(':id')
    async getPayable(@Param('id') id: string) {
        return await this.payableService.getPayableByDocument(id);
    }

    @Post()
    async createPayable(
        @Body() payable: Payable
    ) {
        const { value, emissionDate, assignorId } = payable;

        return await this.payableService.createPayable(new Payable(null, value, emissionDate, null, assignorId));
    }

    @Patch()
    async updatePayable(
        @Body() payable: Payable
    ) {
        const { id, value, emissionDate, assignorId } = payable;

        return await this.payableService.updatePayable(new Payable(id, value, emissionDate, null, assignorId));
    }

    @Delete(':id')
    async deletePayable(@Param('id') id: string) {
        return await this.payableService.deletePayableByDocument(id);
    }

}