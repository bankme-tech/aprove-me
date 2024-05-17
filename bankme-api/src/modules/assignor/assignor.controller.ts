import {Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorDto } from './dto/assignor.dto';
import { EditAssignorDto } from './dto/editAssignor.dto';


@Controller('integrations/assignor')
export class AssignorController {
  constructor(private service: AssignorService) {}

  @Get()
  findAll(): Promise<AssignorDto []> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param() params: any) {
    const id = Number(params.id);

    return this.service.findById(id);
  }

  @Post()
  create(@Body(new ValidationPipe()) assignor: AssignorDto): Promise<AssignorDto> {
    return this.service.createAssignor(assignor);
  }

  @Put(':id')
  edit(@Param() params: any, @Body(new ValidationPipe) data: EditAssignorDto): Promise<AssignorDto> {
    const id = Number(params.id)
    return this.service.edit(id, data);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    const id = Number(params.id);

    return this.service.delete(id);
  }
}
