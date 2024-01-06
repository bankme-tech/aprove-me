import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { PayableService } from './payable.service';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { CreateCatDto, createCatSchema } from './payable.schema';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly appService: PayableService) {}

  @Get()
  index() {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  store(@Body() data: CreateCatDto) {
    return data;
  }
}
