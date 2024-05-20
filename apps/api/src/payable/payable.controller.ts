import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import {
  CreatePayableDto,
  createPayableSchema,
} from './dtos/create-payable.dto';
import { PayableService } from './payable.service';
import { z } from 'zod';
import { uuidSchema } from 'src/common/zod';
import {
  UpdatePayableDto,
  updatePayableSchema,
} from './dtos/update-payable.dto';

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
