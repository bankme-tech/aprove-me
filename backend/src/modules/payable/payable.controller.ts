import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { CreatePayableDto } from './payable.dto';
import { PayableService } from './payable.service';

@Controller({ version: '1' })
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post('/integrations/payable')
  @HttpCode(201)
  async create(@Body() body: CreatePayableDto): Promise<Payable> {
    return await this.payableService.createPayable(body);
  }
}
