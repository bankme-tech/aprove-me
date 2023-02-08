import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AssignorDTO } from './assignor.dto';
import { AssignorService } from './assignor.service';



@Controller('assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post('/create')
  async create(@Body() data: AssignorDTO) {
    return this.assignorService.create(data);
  }

  @Get()
  async findAll() {
    return this.assignorService.findAll();
  }

  
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: AssignorDTO) {
    return this.assignorService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.assignorService.delete(id);
  }
}