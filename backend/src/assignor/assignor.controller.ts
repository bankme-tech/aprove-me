import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { AssignorService } from "./assignor.service";
import { Assignor } from "./assignor.model";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../role/role.decorator";
import { Role } from "../role/role.enum";
import { RoleGuard } from "../role/role.guard";
import { Response } from "express";

@Controller()
export class AssignorController {
    constructor(private readonly assignorService: AssignorService) { }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Get()
    async getAssignors() {
        return await this.assignorService.getAllAssignors();
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @Get(':id')
    async getAssignor(@Res() res: Response, @Param('id') id: string) {
        const result = await this.assignorService.getAssignorById(id);

        if(!result) {
            res.status(HttpStatus.NOT_FOUND).send();
        }

        res.json(result).send();
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.Admin)
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
    @Roles(Role.Admin)
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
    @Roles(Role.Admin)
    @Delete(':id')
    async deleteAssignor(@Param('id') id: string) {
        return await this.assignorService.deleteAssignorById(id);
    }
}