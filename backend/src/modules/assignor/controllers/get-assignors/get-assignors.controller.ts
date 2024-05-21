import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetAssignorsService } from '../../services/get-assignors/get-assignors.service';
import { ResponsePresenter } from './response.presenter';

@Controller('/integrations/assignors')
export class GetAssignorsController {
  constructor(private service: GetAssignorsService) {}

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
