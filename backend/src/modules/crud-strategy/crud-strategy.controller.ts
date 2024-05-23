/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Quantidade de itens por página',
  })
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<T[]> {
    const skip = (page - 1) * limit;
    return await this.baseCrudService.findMany({ skip, take: limit });
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
