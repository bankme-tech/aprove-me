import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
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
@UseGuards(AuthGuard)
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createPayableSchema))
    createPayableDto: CreatePayableDto,
    @Request()
    request,
  ) {
    const userId = request.user.id;
    return this.payableService.create({ userId, ...createPayableDto });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Request()
    request,
  ) {
    const userId = request.user.id;
    return this.payableService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
    @Request()
    request,
  ) {
    const userId = request.user.id;
    return this.payableService.findById({ id, userId });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  delete(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
    @Request()
    request,
  ) {
    const userId = request.user.id;
    return this.payableService.delete({ id, userId });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', new ZodValidationPipe(uuidSchema))
    id: string,
    @Body(new ZodValidationPipe(updatePayableSchema))
    updatePayableDto: UpdatePayableDto,
    @Request()
    request,
  ) {
    const userId = request.user.id;
    return this.payableService.update({ id, userId, ...updatePayableDto });
  }
}
