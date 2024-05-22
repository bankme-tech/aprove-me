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
import { FindAssignorByIdService } from '../../services/find-assignor-by-id/find-assignor-by-id.service';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindAssignorByIdResponseSchema } from './respose.schema';
import { plainToInstance } from 'class-transformer';

@ApiTags('Assignor')
@ApiBearerAuth()
@Controller('/integrations/assignor')
export class FindAssignorByIdController {
  constructor(private service: FindAssignorByIdService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Assignor found.',
    type: FindAssignorByIdResponseSchema,
  })
  @ApiNotFoundResponse({ description: 'Assignor not found.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async handle(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FindAssignorByIdResponseSchema> {
    const result = await this.service.execute({ id: id });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case NotFoundResource:
          throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);

        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return plainToInstance(FindAssignorByIdResponseSchema, result.value);
  }
}
