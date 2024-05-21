import { Controller, Get, Post } from '@nestjs/common';
import { PayablesService } from './payable.service';

@Controller('/integrations/payable')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) { }

  @Post()
  create(): string {
    return this.payablesService.getHello();
  }

  @Get()
  getHello(): string {
    return this.payablesService.getHello();
  }

}
