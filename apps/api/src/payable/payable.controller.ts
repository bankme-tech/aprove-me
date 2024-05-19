import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { CreatePayableDto, createPayableSchema } from './create-payable.dto';
import { PayableService } from './payable.service';
import { z } from 'zod';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPayableSchema))
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Get(':id')
  findById(
    @Param('id', new ZodValidationPipe(z.string().uuid()))
    id: string,
  ) {
    return this.payableService.findById(id);
  }
}
