import { Body, Controller, Delete, Get, Param, Patch, Post, } from '@nestjs/common';
import { CreateAssignorDto } from 'src/application/dtos/create-assignor.dto';
import { UpdateAssignorDto } from 'src/application/dtos/update-assignor.dto';
import { Assignor } from 'src/domain/entities/assignor.entity';
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() assignor: Assignor) {
    return this.assignorService.update(id, assignor);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.assignorService.delete(id);
  }
}
