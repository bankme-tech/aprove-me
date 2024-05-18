import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { CreatePayableDto, createPayableSchema } from './create-payable.dto';
import { PayableService } from './payable.service';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPayableSchema))
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }
}
