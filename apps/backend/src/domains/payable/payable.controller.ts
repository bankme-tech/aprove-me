import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UsePipes,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import {
  CreatePayableWithAssignorDto,
  createPayableWithAssignorSchema,
} from './payable.schema';
import { Response } from 'express';
import {
  PaginationSchema,
  paginationSchema,
} from 'src/schemas/pagination.schema';
import {
  CreatePayableSchema,
  createPayableSchema,
} from 'src/schemas/payable.schema';

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
  async store(
    @Body(new ZodValidationPipe(createPayableWithAssignorSchema))
    payload: CreatePayableWithAssignorDto,
  ) {
    const data = await this.service.store(payload);

    return { data };
  }

  @Get(':id')
  async show(@Param() params: { id: string }, @Res() res: Response) {
    const data = await this.service.show(params.id);

    if (!data) return res.status(404).json({});

    return res.json({ data });
  }

  @Patch(':id')
  async update(
    @Param() params: { id: string },
    @Body(new ZodValidationPipe(createPayableSchema.partial()))
    payload: CreatePayableSchema,
    @Res() res: Response,
  ) {
    const data = await this.service.update(params.id, payload);

    if (!data) return res.status(404).json({});

    return res.json({ data });
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }, @Res() res: Response) {
    const data = await this.service.delete(params.id);

    if (!data) return res.status(404).json({});

    return res.json({ data });
  }
}
