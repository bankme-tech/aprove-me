import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetPayablesService } from '../../services/get-payables/get-payables.service';
import { ResponsePresenter } from './response.presenter';

@Controller('/integrations/payables')
export class GetPayablesController {
  constructor(private service: GetPayablesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle() {
    const result = await this.service.execute();

    if (result.isLeft()) {
      switch (result.value.constructor) {
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return ResponsePresenter.toHttp(result.value);
  }
}
