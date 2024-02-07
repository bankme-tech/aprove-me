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

    @Get(':document')
    async getAssignor(@Param('document') document: string) {
        return await this.assignorService.getAssignorByDocument(document);
    }

    @Post()
    async createAssignor(
        @Body() assignor: Assignor
    ) {
        const { document, email, phone, name } = assignor;

        return await this.assignorService.createAssignor(new Assignor(document, email, phone, name));
    }

    @Patch()
    async updateAssignor(
        @Body() assignor: Assignor
    ) {
        const { document, email, phone, name } = assignor;

        return await this.assignorService.updateAssignor(new Assignor(document, email, phone, name));
    }

    @Delete(':document')
    async deleteAssignor(@Param('document') document: string) {
        return await this.assignorService.deleteAssignorByDocument(document);
    }
}