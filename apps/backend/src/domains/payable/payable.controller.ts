import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UsePipes,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { CreatePayableDto, createPayableSchema } from './payable.schema';
import { Response } from 'express';
import {
  PaginationSchema,
  paginationSchema,
} from 'src/schemas/pagination.schema';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly service: PayableService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(paginationSchema))
  async index(@Query() query: PaginationSchema) {
    const [data, metadata] = await this.service.index(query);

    return {
      data,
      ...metadata,
    };
  }

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
