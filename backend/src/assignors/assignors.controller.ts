import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Controller('integrations/assignor')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) { }

  @Post()
  async create(@Body() payableData: { document: string; email: string; phone: string; name: string; }) {
    const { document, email, phone, name } = payableData;
    return this.assignorsService.create({ document, email, phone, name });
  }

  @Get()
  findAll() {
    return this.assignorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignorDto: UpdateAssignorDto) {
    return this.assignorsService.update(+id, updateAssignorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignorsService.remove(+id);
  }
}
