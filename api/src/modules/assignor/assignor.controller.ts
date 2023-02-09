import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AssignorDTO } from '../../dtos/assignor.dto';
import { AssignorService } from './assignor.service';




@Controller('integrations')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post('assignor')
  async create(@Body() data: AssignorDTO) {
    return this.assignorService.create(data);
  }

  @Get('assignor')
  async findAll() {
    
    return this.assignorService.findAll();
  }

  
  @Put('assignor/:id')
  async update(@Param('id') id: string, @Body() data: AssignorDTO) {
    return this.assignorService.update(id, data);
  }

  @Delete('assignor/:id')
  async delete(@Param('id') id: string) {
    return this.assignorService.delete(id);
  }
}