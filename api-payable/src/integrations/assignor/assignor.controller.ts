import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AssignorRepository } from './assignor.repository';
import { Assignor } from '@prisma/client';
import { AssignorDto } from './dtos/assignor.dto';
import { PartialAssignorDto } from './dtos/partial-assignor.dto';

@Controller('/integrations/assignors')
export class AssignorController {
  constructor(private readonly assignorService: AssignorRepository) {}

  @Post()
  async create(@Body() dto: AssignorDto): Promise<Assignor> {
    return this.assignorService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: PartialAssignorDto,
  ): Promise<Assignor> {
    return this.assignorService.update(id, data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Assignor | null> {
    const assignor = await this.assignorService.getById(id);
    if (!assignor) throw new NotFoundException(`Assignor not found. Id: ${id}`);
    return assignor;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Assignor> {
    return this.assignorService.delete(id);
  }
}
