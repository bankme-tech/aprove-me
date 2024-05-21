import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FindAssignorByIdService } from '../../services/find-assignor-by-id/find-assignor-by-id.service';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { ResponsePresenter } from './response.presenter';

@Controller('/integrations/assignor')
export class FindAssignorByIdController {
  constructor(private service: FindAssignorByIdService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
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
