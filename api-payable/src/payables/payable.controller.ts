import { Controller, Get } from '@nestjs/common';
import { PayablesService } from './payables.service';

@Controller()
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) { }

  @Get()
  getHello(): string {
    return this.payablesService.getHello();
  }
}
