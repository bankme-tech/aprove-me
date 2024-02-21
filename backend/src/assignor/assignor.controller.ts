import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Controller('assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  findAll() {
    return this.assignorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignorDto: UpdateAssignorDto) {
    return this.assignorService.update(+id, updateAssignorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignorService.remove(+id);
  }
}
