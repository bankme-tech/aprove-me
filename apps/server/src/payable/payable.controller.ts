import { AuthGuard } from '@/common/guards/auth.guard'
import { ZodValidationPipe } from '@/common/pipe/zod-validation.pipe'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import {
  PayableCreateSchema,
  PayableCreateSchemaBatch,
  payableCreateSchema,
  payableCreateSchemaBatch,
} from './dto/create-payable.dto'
import {
  PayableUpdateSchema,
  payableUpdateSchema,
} from './dto/update-payable.dto'
import { PayableService } from './payable.service'

const createValidationPipe = new ZodValidationPipe(payableCreateSchema)
const createValidationPipeBatch = new ZodValidationPipe(
  payableCreateSchemaBatch,
)
const updateValidationPipe = new ZodValidationPipe(payableUpdateSchema)

@UseGuards(AuthGuard)
@Controller('payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get(':payableId')
  payable(@Param('payableId') payableId: string) {
    return this.payableService.get(payableId)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(createValidationPipe) data: PayableCreateSchema) {
    return this.payableService.create(data)
  }

  @Put(':payableId')
  update(
    @Body(updateValidationPipe) data: PayableUpdateSchema,
    @Param('payableId') payableId: string,
  ) {
    return this.payableService.update(data, payableId)
  }

  @Put('cancel/:payableId')
  cancel(@Param('payableId') payableId: string) {
    return this.payableService.cancel(payableId)
  }

  @Put('pay/:payableId')
  pay(@Param('payableId') payableId: string) {
    return this.payableService.pay(payableId)
  }

  @Delete(':payableId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('payableId') payableId: string) {
    this.payableService.destroy(payableId)
  }

  @Post('batch')
  @HttpCode(HttpStatus.NO_CONTENT)
  createProcess(
    @Body(createValidationPipeBatch) data: PayableCreateSchemaBatch,
  ) {
    return this.payableService.createMany(data)
  }
}
