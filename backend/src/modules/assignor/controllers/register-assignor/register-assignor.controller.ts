import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterAssignorRequestSchema } from './request.schema';
import { RegisterAssignorService } from '../../services/register-assignor/register-assignor.service';
import { InvalidEntityEntry } from '~/common/exceptions/invalid-entity-entry.exception';
import { ResponsePresenter } from './response.presenter';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';

@Controller('integrations/assignor')
export class RegisterAssignorController {
  constructor(private service: RegisterAssignorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async handle(@Body() data: RegisterAssignorRequestSchema) {
    const result = await this.service.execute(data);

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case InvalidEntityEntry:
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return ResponsePresenter.toHTTP(result.value);
  }
}
