import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import Payable from '../entity/Payable';
import PayableCreationDto from '../dto/PayableCreationDto';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('integrations/payable')
export class PayableController {
  constructor(private payableService: PayableService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async createPayableRegister(@Body() payableBody: PayableCreationDto) {
    const payable: Payable = payableBody.toEntity();
    const responsePayable =
      await this.payableService.createPayableRegister(payable);

    return responsePayable;
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findPayableById(@Param('id') id: string) {
    const responsePayable = await this.payableService.findPayableById(id);

    return responsePayable;
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updatePayableById(
    @Param('id') id: string,
    @Body() payableBody: PayableCreationDto,
  ) {
    const payable: Payable = payableBody.toEntity();
    const responsePayable = await this.payableService.updatePayableById(
      id,
      payable,
    );

    return responsePayable;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deletePayableById(@Param('id') id: string) {
    await this.payableService.deletePayableById(id);

    return;
  }
}
