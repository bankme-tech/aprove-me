import { Body, Controller, Post } from '@nestjs/common';
import { CreatePayableDTO } from './dto/create-payable.dto';

@Controller('integrations/payable')
export class PayableController {
  @Post()
  create(@Body() payable: CreatePayableDTO): Promise<CreatePayableDTO> {
    return Promise.resolve(payable);
  }
}
