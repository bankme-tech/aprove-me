import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterBatchPayableRequestSchema } from './request.schema';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';
import { RegisterBatchPayableService } from '../../services/register-batch-payable/register-batch-payable.service';

@Controller('/integrations/payable/batch')
export class RegisterBatchPayableController {
  constructor(private service: RegisterBatchPayableService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async handle(@Body() { payables }: RegisterBatchPayableRequestSchema) {
    const result = await this.service.execute({
      payables: payables.map((payable) => ({
        ...payable,
        assignorId: payable.assignor,
      })),
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case NotFoundResource:
          throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);

        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
