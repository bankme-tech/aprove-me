import { Body, Controller, Get, Param, Post, } from '@nestjs/common';
import { CreateAssignorDto } from 'src/application/dtos/create-assignor.dto';
import { AssignorService } from 'src/domain/services/assignor.service';

@Controller('integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService){}
  @Get()
  initial(): string {
    return "Hello From Assignor!"
  }
  @Post()
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.createAssignor(createAssignorDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.assignorService.findById(id);
  }
}
