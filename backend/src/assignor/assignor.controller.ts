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
    async getAssignor(@Param('id') id: number) {
        return await this.assignorService.getAssignorById(Number(id));
    }

    @Post()
    async createAssignor(
        @Body() assignor: Assignor
    ) {
        const { document, email, phone, name } = assignor;

        return await this.assignorService.createAssignor(new Assignor(null, document, email, phone, name, null));
    }

    @Patch()
    async updateAssignor(
        @Body() assignor: Assignor
    ) {
        const { id, document, email, phone, name} = assignor;

        return await this.assignorService.updateAssignor(new Assignor(id, document, email, phone, name, null));
    }

    @Delete(':id')
    async deleteAssignor(@Param('id') id: number) {
        return await this.assignorService.deleteAssignorById(Number(id));
    }
}