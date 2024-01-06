import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { PayableService } from './payable.service';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { CreatePayableDto, createPayableSchema } from './payable.schema';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  @Get()
  index() {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPayableSchema))
  store(@Body() data: CreatePayableDto) {
    return this.service.store(data);
  }
}
