import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { Assignor } from '@prisma/client';

@Controller('/integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  create(@Body() createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  findAll(): Promise<Assignor[]> {
    return this.assignorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Assignor> {
    return this.assignorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignorDto: UpdateAssignorDto): Promise<Assignor> {
    return this.assignorService.update(+id, updateAssignorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Assignor> {
    return this.assignorService.remove(+id); 
  }
}
