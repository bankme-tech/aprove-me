import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePayableDto, UpdatePayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

@Controller('integrations')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  @Post('payable')
  async create(@Body() dto: CreatePayableDto) {
    const createdPayable = await this.service.createPayable(dto);
    return createdPayable;
  }

  @Get('payable/:id')
  async findOne(@Param('id') id: string) {
    const payable = await this.service.getPayableById(id);
    return payable;
  }

  @Patch('payable/:id')
  async update(@Param('id') id: string, @Body() dto: UpdatePayableDto) {
    const updatedAssignor = await this.service.updatePayable(id, dto);
    return updatedAssignor;
  }

  @Delete('payable/:id')
  async remove(@Param('id') id: string) {
    return await this.service.deletePayable(id);
  }
}
