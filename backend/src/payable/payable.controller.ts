import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PayableService } from "./payable.service";
import { Payable } from "./payable.model";
import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../role/role.guard";
import { Roles } from "../role/role.decorator";
import { Role } from "../role/role.enum";

@Controller()
export class PayableController {
    constructor(private readonly payableService: PayableService) { }

    @UseGuards(AuthGuard, RoleGuard)
   @Roles(Role.Admin)
    @Get()
    async getPayables() {
        return await this.payableService.getAllPayables();
    }

    @UseGuards(AuthGuard, RoleGuard)
   @Roles(Role.Admin)
    @Get(':id')
    async getPayable(@Param('id') id: string) {
        return await this.payableService.getPayableById(id);
    }

    @UseGuards(AuthGuard, RoleGuard)
   @Roles(Role.Admin)
    @Post()
    async createPayable(
        @Body() payable: Payable
    ) {
        const { value, assignorId } = payable;

        const newPayable = new Payable();
        newPayable.value = value;
        newPayable.assignorId = assignorId;

        return await this.payableService.createPayable(newPayable);
    }

    @UseGuards(AuthGuard, RoleGuard)
   @Roles(Role.Admin)
    @Patch()
    async updatePayable(
        @Body() payable: Payable
    ) {
        const { id, value, assignorId } = payable;

        const newPayable = new Payable();
        newPayable.id = id;
        newPayable.value = value;
        newPayable.assignorId = assignorId;

        return await this.payableService.updatePayable(newPayable);
    }

    @UseGuards(AuthGuard, RoleGuard)
   @Roles(Role.Admin)
    @Delete(':id')
    async deletePayable(@Param('id') id: string) {
        return await this.payableService.deletePayableById(id);
    }

}