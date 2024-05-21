import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FindPayableByIdService } from '../../services/find-payable-by-id/find-payable-by-id.service';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { ResponsePresenter } from './response.presenter';

@Controller('/integrations/payable')
export class FindPayableByIdController {
  constructor(private service: FindPayableByIdService) {}

  @Get('/:id')
  async handle(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.service.execute({ id: id });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case NotFoundResource:
          throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);

        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return ResponsePresenter.toHTTP(result.value);
  }
}
