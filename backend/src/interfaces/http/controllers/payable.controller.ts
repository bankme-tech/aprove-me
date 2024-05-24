import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PayableService } from 'src/domain/services/payable.service';
import { CreatePayableDto } from 'src/application/dtos/create-payable.dto';
import { Payable } from 'src/domain/entities/payable.entity';
import { AuthGuard } from 'src/interfaces/auth/auth.guard';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get()
  initial(): string {
    return 'Hello From Payable!';
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll() {
    return this.payableService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.createPayable(createPayableDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.payableService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() payable: Payable) {
    return this.payableService.update(id, payable);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.payableService.delete(id);
  }
}
