import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { AssignorService } from './assignor.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Controller()
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  async getAll() {
    return this.assignorService.getAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAssignorDto: UpdateAssignorDto) {
    return this.assignorService.update(id, updateAssignorDto);
  }
}
