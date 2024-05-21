import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ZodValidationPipe } from '../zod-validation/zod-validation.pipe';
import {
  CreatePayableDto,
  createPayableSchema,
  UpdatePayableDto,
  updatePayableSchema,
} from './dto';
import { PayableService } from './payable.service';
import { uuidSchema } from '../common/zod';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createPayableSchema))
    createPayableDto: CreatePayableDto,
  ) {
    return this.payableService.create(createPayableDto);
  }

  @Get(':id')
  findById(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
  ) {
    return this.payableService.findById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
  ) {
    return this.payableService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
    @Body(new ZodValidationPipe(updatePayableSchema))
    updatePayableDto: UpdatePayableDto,
  ) {
    return this.payableService.update(id, updatePayableDto);
  }
}
