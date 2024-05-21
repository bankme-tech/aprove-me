import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Controller({ version: '1' })
export class PayableController {
  @Post('/integrations/payable')
  @HttpCode(204)
  create(@Body() body: Prisma.PayableCreateInput): Prisma.PayableCreateInput {
    return body;
  }
}
