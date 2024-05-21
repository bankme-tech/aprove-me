import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Controller('integrations')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post('payable')
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Get('payable')
  findAll() {
    return this.payableService.findAll();
  }

  @Get('payable/:id')
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(+id);
  }

  @Patch('payable/:id')
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payableService.update(+id, updatePayableDto);
  }

  @Delete('payable/:id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(+id);
  }
}
