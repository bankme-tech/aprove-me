import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import Payable from '../entity/Payable';
import PayableCreationDto from '../dto/PayableCreationDto';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../types';

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
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() payableBody: PayableCreationDto,
  ) {
    const { user } = req;
    const payable: Payable = payableBody.toEntity();

    const responsePayable = await this.payableService.updatePayableById(
      id,
      payable,
      user.sub,
    );

    return responsePayable;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deletePayableById(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    const { user } = req;

    await this.payableService.deletePayableById(id, user.sub);

    return;
  }

  @Post('/batch')
  @UseGuards(AuthGuard)
  async processBatch(
    @Request() req: RequestWithUser,
    @Body() batchData: PayableCreationDto[],
  ) {
    const { user } = req;
    await this.payableService.processBatch(batchData, user);

    return 'Lote em processamento.';
  }
}
