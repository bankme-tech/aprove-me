import {
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { DeletePayableService } from '../../services/delete-payable/delete-payable.service';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';

@Controller('/integrations/payable')
export class DeletePayableController {
  constructor(private service: DeletePayableService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async handle(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.service.execute({
      id,
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
