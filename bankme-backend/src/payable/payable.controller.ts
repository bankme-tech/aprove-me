import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePayableDto, UpdatePayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

@ApiBearerAuth()
@ApiTags('payable')
@Controller('integrations')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  /**
   * Create new Payable
   */
  @Post('payable')
  async create(@Body() dto: CreatePayableDto) {
    const createdPayable = await this.service.createPayable(dto);
    return createdPayable;
  }

  /**
   * Returns list of Payable
   */
  @Get('payable')
  async findall() {
    const payables = await this.service.getAllPayable();
    return payables;
  }

  /**
   * Returns one Payable by id
   */
  @Get('payable/:id')
  async findOne(@Param('id') id: string) {
    const payable = await this.service.getPayableById(id);
    return payable;
  }

  /**
   * Update one Payable by id
   */
  @Patch('payable/:id')
  async update(@Param('id') id: string, @Body() dto: UpdatePayableDto) {
    const updatedAssignor = await this.service.updatePayable(id, dto);
    return updatedAssignor;
  }

  /**
   * Delete one Payable by id
   */
  @Delete('payable/:id')
  async remove(@Param('id') id: string) {
    return await this.service.deletePayable(id);
  }
}
