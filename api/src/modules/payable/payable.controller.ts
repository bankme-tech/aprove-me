import { Body, Controller, Post } from '@nestjs/common';
import { CreatePayableDTO } from './dto/create-payable.dto';

@Controller('payable')
export class PayableController {
  @Post()
  create(@Body() payable: CreatePayableDTO): Promise<CreatePayableDTO> {
    return Promise.resolve(payable);
  }
}
