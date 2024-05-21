import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
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
import { AuthGuard } from '../auth/auth.guard';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body(new ZodValidationPipe(createPayableSchema))
    createPayableDto: CreatePayableDto,
  ) {
    return this.payableService.create(createPayableDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
  ) {
    return this.payableService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  delete(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
  ) {
    return this.payableService.delete(id);
  }

  @UseGuards(AuthGuard)
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
