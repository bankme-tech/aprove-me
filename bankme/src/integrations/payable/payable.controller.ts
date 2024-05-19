import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import PayableDto from '../dto/PayableDto';
import Payable from '../entity/Payable';

@Controller('integrations/payable')
export class PayableController {
  constructor(private payableService: PayableService) {}

  @Post('/')
  async createPayableRegister(@Body() payableBody: PayableDto) {
    const payable: Payable = payableBody.toEntity();
    const responsePayable =
      await this.payableService.createPayableRegister(payable);

    return responsePayable;
  }

  @Get('/:id')
  async findPayableById(@Param('id') id: string) {
    const responsePayable = await this.payableService.findPayableById(id);

    return responsePayable;
  }

  @Put('/:id')
  async updatePayableById(
    @Param('id') id: string,
    @Body() payableBody: PayableDto,
  ) {
    const payable: Payable = payableBody.toEntity();
    const responsePayable = await this.payableService.updatePayableById(
      id,
      payable,
    );

    return responsePayable;
  }

  @Delete('/:id')
  async deletePayableById(@Param('id') id: string) {
    await this.payableService.deletePayableById(id);

    return;
  }
}
