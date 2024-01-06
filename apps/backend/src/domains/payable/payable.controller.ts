import { Controller, Get } from '@nestjs/common';
import { PayableService } from './payable.service';

@Controller()
export class PayableController {
  constructor(private readonly appService: PayableService) {}

  @Get()
  index() {}
}
