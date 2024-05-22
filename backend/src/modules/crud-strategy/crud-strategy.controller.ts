/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CrudStrategyService } from './crud-strategy.service';

@Controller()
export class CrudStrategyController<T, C, U> {
  constructor(private readonly baseCrudService: CrudStrategyService<T, C, U>) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createDto: C, @Req() req?): Promise<T> {
    return await this.baseCrudService.create(createDto);
  }

  @Get()
  async findAll(): Promise<T[]> {
    return await this.baseCrudService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T> {
    return await this.baseCrudService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: U): Promise<T> {
    return await this.baseCrudService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<T> {
    return await this.baseCrudService.remove(id);
  }
}
