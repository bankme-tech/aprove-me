import { Controller, Get, Param, Post } from "@nestjs/common";
import { AssignorService } from "./assignor.service";

@Controller('assignor')
export class AssignorController {
    constructor(private readonly assignorService: AssignorService) {}

    @Get()
    getAssignors() {}

    @Get(':id')
    getAssignor(@Param('id') id: string ) {}

    @Post()
    createAssignor() {}
}