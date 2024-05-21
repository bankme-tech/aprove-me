import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetPayablesService } from '../../services/get-payables/get-payables.service';
import { ResponsePresenter } from './response.presenter';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';

@Controller('/integrations/payables')
export class GetPayablesController {
  constructor(private service: GetPayablesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
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
