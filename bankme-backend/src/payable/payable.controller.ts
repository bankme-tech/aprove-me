import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
  async payable(@Body() dto: CreatePayableDto) {
    const createdPayable = await this.service.createPayable(dto);
    return createdPayable;
  }

  @Get('payable/:id')
  async findOnePayable(@Param('id') id: string) {
    const payable = await this.service.getPayableById(id);
    if (!payable) {
      throw new NotFoundException();
    }
    return payable;
  }

  @Patch('payable/:id')
  async updatePayable(@Param('id') id: string, @Body() dto: UpdatePayableDto) {
    const updatedAssignor = await this.service.updatedPayable(id, dto);
    return updatedAssignor;
  }

  @Delete('payable/:id')
  async deletePayable(@Param('id') id: string) {
    return await this.service.deletePayable(id);
  }
}
