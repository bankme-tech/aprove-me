import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PayableService } from "./payable.service";
import { Payable } from "./payable.model";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/role/role.guard";
import { Roles } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";

@Controller()
export class PayableController {
    constructor(private readonly payableService: PayableService) { }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Get()
    async getPayables() {
        return await this.payableService.getAllPayables();
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Get(':id')
    async getPayable(@Param('id') id: string) {
        return await this.payableService.getPayableById(id);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
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

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
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

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Delete(':id')
    async deletePayable(@Param('id') id: string) {
        return await this.payableService.deletePayableById(id);
    }

}