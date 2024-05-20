import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { Prisma } from '@prisma/client';

@Controller('integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  create(@Body() createAssignorDto: Prisma.AssignorCreateInput) {
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
  update(@Param('id') id: string, @Body() updateAssignorDto: Prisma.AssignorUpdateInput) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignorService.remove(id);
  }
}
