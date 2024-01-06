import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { CreatePayableDto, createPayableSchema } from './payable.schema';
import { Response } from 'express';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  @Get()
  index() {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPayableSchema))
  async store(@Body() payload: CreatePayableDto) {
    const data = await this.service.store(payload);

    return { data };
  }

  @Get(':id')
  async show(@Param() params: { id: string }, @Res() res: Response) {
    const data = await this.service.show(params.id);

    if (!data) return res.status(404).json();

    return res.json({ data });
  }
}
