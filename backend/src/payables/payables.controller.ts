import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create.payable.dto';
import { UpdatePayableDto } from './dto/update.payable.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('payable')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post('')
  async createPayable(@Body() payableDto: CreatePayableDto) {
    return this.payablesService.createPayable(payableDto);
  }

  @Get('/:id')
  async getPayableById(@Param('id') id: string) {
    const payable = await this.payablesService.getPayableById(id);
    if (!payable) throw new NotFoundException('Payable not found');
    return payable;
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePayable(@Body() payableDto: UpdatePayableDto, @Param('id') id: string) {
    return this.payablesService.updatePayable(id, payableDto);
  }

  @Delete('/:id')
  deletePayable(@Param('id') id: string) {
    return this.payablesService.deletePayable(id);
  }

  @Post('batch')
  async batchCreatePayables(@Body() createDtos: CreatePayableDto[]) {
    return this.payablesService.batchCreatePayables(createDtos);
  }
}
