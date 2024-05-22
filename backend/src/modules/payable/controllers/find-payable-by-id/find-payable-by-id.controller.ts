import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { FindPayableByIdService } from '../../services/find-payable-by-id/find-payable-by-id.service';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindByPayableIdResponseSchema } from './response.schema';
import { plainToInstance } from 'class-transformer';

@ApiTags('Payable')
@ApiBearerAuth()
@Controller('/integrations/payable')
export class FindPayableByIdController {
  constructor(private service: FindPayableByIdService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Payable found.',
    type: FindByPayableIdResponseSchema,
  })
  @ApiNotFoundResponse({ description: 'Payable not found.' })
  async handle(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FindByPayableIdResponseSchema> {
    const result = await this.service.execute({ id: id });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case NotFoundResource:
          throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);

        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return plainToInstance(FindByPayableIdResponseSchema, result.value);
  }
}
