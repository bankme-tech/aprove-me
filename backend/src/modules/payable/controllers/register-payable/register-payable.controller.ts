import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterPayableRequestSchema } from './request.schema';
import { RegisterPayableService } from '../../services/register-payable/register-payable.service';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { ResponsePresenter } from './response.presenter';

@Controller('/integrations/payable')
export class RegisterPayableController {
  constructor(private service: RegisterPayableService) {}

  @Post()
  async handle(
    @Body() { assignor, emissionDate, value }: RegisterPayableRequestSchema,
  ) {
    const result = await this.service.execute({
      assignorId: assignor,
      emissionDate,
      value,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case NotFoundResource:
          throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);

        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return ResponsePresenter.toHttp(result.value);
  }
}
