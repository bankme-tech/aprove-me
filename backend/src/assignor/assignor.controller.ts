import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AssignorService } from "./assignor.service";
import { Assignor } from "./assignor.model";

@Controller()
export class AssignorController {
    constructor(private readonly assignorService: AssignorService) { }

    @Get()
    async getAssignors() {
        return await this.assignorService.getAllAssignors();
    }

    @Get(':id')
    async getAssignor(@Param('id') id: string) {
        return await this.assignorService.getAssignorById(id);
    }

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

    @Patch()
    async updateAssignor(
        @Body() assignor: Assignor
    ) {
        const { id, document, email, phone, name} = assignor;

        const newAssignor = new Assignor();
        newAssignor.id = id;
        newAssignor.document = document;
        newAssignor.email = email;
        newAssignor.phone = phone;
        newAssignor.name = name;

        return await this.assignorService.updateAssignor(newAssignor);
    }

    @Delete(':id')
    async deleteAssignor(@Param('id') id: string) {
        return await this.assignorService.deleteAssignorById(id);
    }
}