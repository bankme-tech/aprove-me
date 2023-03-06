import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PayableService } from './payables.service';
import { PayableDto } from './dtos/payable.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('payable')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPayablesList(): Promise<PayableDto[]> {
    return this.service.getAllPayables();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPayablesById(@Param('id') id: string): Promise<PayableDto> {
    return this.service.getPayables(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createPayable(@Body() dto: PayableDto) {
    return this.service.createPayable(dto);
  }

  @EventPattern('payable_created')
  @Post('batch')
  @HttpCode(HttpStatus.OK)
  async createPayableBatch(@Body() dto: PayableDto) {
    return this.service.createPayableBatch(dto);
  }

  @Put('/:id')
  async updatePayable(
    @Param('id') id: string,
    @Body() dto: PayableDto,
  ): Promise<PayableDto> {
    return this.service.updatePayable(id, dto);
  }

  @Delete('/:id')
  async deletePayable(@Param('id') id: string): Promise<PayableDto> {
    return this.service.deletePayable(id);
  }
}
