import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import {
  PaginationSchema,
  paginationSchema,
} from '../../schemas/pagination.schema';
import {
  CreateAssignorSchema,
  createAssignorSchema,
} from '../../schemas/assignor.schema';

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
  async show(@Param() params: { id: string }) {
    const data = await this.service.show(params.id);

    if (!data) throw new NotFoundException();

    return { data };
  }

  @Patch(':id')
  async update(
    @Param() params: { id: string },
    @Body(new ZodValidationPipe(createAssignorSchema.partial()))
    payload: CreateAssignorSchema,
  ) {
    const data = await this.service.update(params.id, payload);

    if (!data) throw new NotFoundException();

    return { data };
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }) {
    const data = await this.service.delete(params.id);

    if (!data) throw new NotFoundException();

    return { data };
  }
}
