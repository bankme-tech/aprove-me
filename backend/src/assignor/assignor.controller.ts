import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AssignorService } from "./assignor.service";
import { Assignor } from "./assignor.model";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RoleGuard } from "src/role/role.guard";

@Controller()
export class AssignorController {
    constructor(private readonly assignorService: AssignorService) { }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Get()
    async getAssignors() {
        return await this.assignorService.getAllAssignors();
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Get(':id')
    async getAssignor(@Param('id') id: string) {
        return await this.assignorService.getAssignorById(id);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Post()
    async createAssignor(
        @Body() assignor: Assignor
    ) {
        const { document, email, phone, name } = assignor;

        const newAssignor = new Assignor();
        newAssignor.document = document;
        newAssignor.email = email;
        newAssignor.phone = phone;
        newAssignor.name = name;

        return await this.assignorService.createAssignor(newAssignor);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Patch()
    async updateAssignor(
        @Body() assignor: Assignor
    ) {
        const { id, document, email, phone, name } = assignor;

        const newAssignor = new Assignor();
        newAssignor.id = id;
        newAssignor.document = document;
        newAssignor.email = email;
        newAssignor.phone = phone;
        newAssignor.name = name;

        return await this.assignorService.updateAssignor(newAssignor);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.User)
    @Delete(':id')
    async deleteAssignor(@Param('id') id: string) {
        return await this.assignorService.deleteAssignorById(id);
    }
}