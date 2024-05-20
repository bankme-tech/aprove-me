import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Payable } from './payable.type';

@Controller({ version: '1' })
export class PayableController {
  @Post('/integrations/payable')
  @HttpCode(204)
  create(@Body() body: Payable): Payable {
    return body;
  }
}
