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
import { AssignorService } from './assignor.service';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { Response } from 'express';
import {
  PaginationSchema,
  paginationSchema,
} from 'src/schemas/pagination.schema';
import {
  CreateAssignorSchema,
  createAssignorSchema,
} from 'src/schemas/assignor.schema';

@Controller('integrations/assignor')
export class AssignorController {
  constructor(private readonly service: AssignorService) {}

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
    @Body(new ZodValidationPipe(createAssignorSchema))
    payload: CreateAssignorSchema,
  ) {
    const data = await this.service.store(payload);

    return { data };
  }

  @Get(':id')
  async show(@Param() params: { id: string }, @Res() res: Response) {
    const data = await this.service.show(params.id);

    if (!data) return res.status(404).json();

    return res.json({ data });
  }

  @Patch(':id')
  async update(
    @Param() params: { id: string },
    @Body(new ZodValidationPipe(createAssignorSchema.partial()))
    payload: CreateAssignorSchema,
    @Res() res: Response,
  ) {
    const data = await this.service.update(params.id, payload);

    if (!data) return res.status(404).json();

    return res.json({ data });
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }, @Res() res: Response) {
    const data = await this.service.delete(params.id);

    if (!data) return res.status(404).json();

    return res.json({ data });
  }
}
