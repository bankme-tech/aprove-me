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

@Controller('payable')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPayablesList(): Promise<PayableDto[]> {
    console.log('getPayablesList @Get');
    return this.service.getAllPayables();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPayablesById(@Param('id') id: string): Promise<PayableDto> {
    console.log('id @Get', id);
    return this.service.getPayables(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createPayable(@Body() dto: PayableDto) {
    console.log('dto @Post', dto);
    return this.service.createPayable(dto);
  }

  @Put(':id')
  async updatePayable(
    @Param('id') id: string,
    @Body() dto: PayableDto,
  ): Promise<PayableDto> {
    console.log('id @Put', id);
    console.log('id @Put', dto);
    return this.service.updatePayable(id, dto);
  }

  @Delete(':id')
  async deletePayable(@Param('id') id: string): Promise<PayableDto> {
    console.log('id @Delete', id);
    return this.service.deletePayable(id);
  }
}
