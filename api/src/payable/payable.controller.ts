import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payableService.update(id, updatePayableDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}
