import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UpdatePayableService } from '../../services/update-payable/update-payable.service';
import { UpdatePayableRequestSchema } from './request.schema';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { ResponsePresenter } from './response.presenter';

@Controller('/integrations/payable')
export class UpdatePayableController {
  constructor(private service: UpdatePayableService) {}

  @Put('/:id')
  async handle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { value, assignorId, emissionDate }: UpdatePayableRequestSchema,
  ) {
    const result = await this.service.execute({
      id,
      assignorId,
      value,
      emissionDate,
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
