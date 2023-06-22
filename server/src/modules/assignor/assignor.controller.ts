import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Controller('assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}
 
  @Post()
  create(
    @Body() data: CreateAssignorDto
  ) {
    return this.assignorService.create({
      data
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignorService.findOne(+id);
  }
}
