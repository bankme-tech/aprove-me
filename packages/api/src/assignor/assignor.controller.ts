import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

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

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.assignorService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAssignorDto: UpdateAssignorDto) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.assignorService.delete(id);
  }
}
