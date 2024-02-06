import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AssignorService } from "./assignor.service";
import { Assignor } from "./assignor.model";

@Controller('assignor')
export class AssignorController {
    constructor(private readonly assignorService: AssignorService) { }

    @Get()
    getAssignors() {
        return this.assignorService.getAllAssignors();
    }

    @Get(':id')
    getAssignor(@Param('id') id: string) {
        return this.assignorService.getAssignorById(id);
    }

    @Post()
    saveAssignor(
        @Body() assignor: Assignor
    ) {
        const {document, email, phone, name} = assignor;

        this.assignorService.saveAssignor(new Assignor(document, email, phone, name));
        return;
    }
}