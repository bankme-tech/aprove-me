import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import {  Assignor as AssignorModel } from '@prisma/client';

@Controller('integrations/assignor')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) { }

  @Post()
  async create(@Body() assignorData: CreateAssignorDto) {
    const { document, email, phone, name } = assignorData;
    return this.assignorsService.create({ document, email, phone, name });
  }

  @Get()
  findAll() {
    return this.assignorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AssignorModel>{
    const assignor =  this.assignorsService.findOne({id});
    if (assignor) {
      return assignor
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignorDto: UpdateAssignorDto): Promise<AssignorModel> {
    return this.assignorsService.update({
      where: { id },
      data: updateAssignorDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<AssignorModel> {
    return this.assignorsService.remove({id});
  }
}
