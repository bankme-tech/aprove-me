import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { AssignorService } from "./assignor.service";
import { Assignor } from "./assignor.model";

@Controller('assignor')
export class AssignorController {
    constructor(private readonly assignorService: AssignorService) { }

    @Get()
    getAssignors() {
        return this.assignorService.getAllAssignors();
    }

    @Get(':document')
    getAssignor(@Param('document') document: string) {
        return this.assignorService.getAssignorByDocument(document);
    }

    @Post()
    createAssignor(
        @Body() assignor: Assignor
    ) {
        const {document, email, phone, name} = assignor;

        this.assignorService.createAssignor(new Assignor(document, email, phone, name));
        return;
    }

    @Patch()
    updateAssignor(
        @Body() assignor: Assignor
    ) {
        const {document, email, phone, name} = assignor;

        this.assignorService.updateAssignor(new Assignor(document, email, phone, name));
        return;
    }
}