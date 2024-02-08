import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PayableService } from "./payable.service";
import { Payable } from "./payable.model";
import { AuthGuard } from "src/auth/auth.guard";

@Controller()
export class PayableController {
    constructor(private readonly payableService: PayableService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getPayables() {
        return await this.payableService.getAllPayables();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getPayable(@Param('id') id: string) {
        return await this.payableService.getPayableById(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createPayable(
        @Body() payable: Payable
    ) {
        const { value, emissionDate, assignorId } = payable;

        const newPayable = new Payable();
        newPayable.value = value;
        newPayable.emissionDate = emissionDate;
        newPayable.assignorId = assignorId;

        return await this.payableService.createPayable(newPayable);
    }

    @UseGuards(AuthGuard)
    @Patch()
    async updatePayable(
        @Body() payable: Payable
    ) {
        const { id, value, emissionDate, assignorId } = payable;

        const newPayable = new Payable();
        newPayable.id = id;
        newPayable.value = value;
        newPayable.emissionDate = emissionDate;
        newPayable.assignorId = assignorId;

        return await this.payableService.updatePayable(newPayable);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deletePayable(@Param('id') id: string) {
        return await this.payableService.deletePayableById(id);
    }

}