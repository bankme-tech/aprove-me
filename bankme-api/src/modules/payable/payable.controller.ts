import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { EditPayableDto } from './dto/editPayable.dto';
import { PayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

@Controller('integrations/payable')
export class PayableController {
  constructor(private service: PayableService) {}

  @Get()
  findAll(): Promise<PayableDto []> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param() params: any) {
    return this.service.findById(params.id)
  }

  @Post()
  create(@Body(new ValidationPipe()) payable: PayableDto): Promise<PayableDto> {
    return this.service.createPayable(payable);
  }

  @Put(':id')
  edit(@Param() params: any, @Body(new ValidationPipe) data: EditPayableDto): Promise<PayableDto> {
    return this.service.edit(params.id, data);
  }
}