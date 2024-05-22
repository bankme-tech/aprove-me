import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetAssignorsService } from '../../services/get-assignors/get-assignors.service';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetAssignorsResponseSchema } from './respose.schema';
import { plainToInstance } from 'class-transformer';

@ApiTags('Assignor')
@ApiBearerAuth()
@Controller('/integrations/assignors')
export class GetAssignorsController {
  constructor(private service: GetAssignorsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Assignors found.',
    type: [GetAssignorsResponseSchema],
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async handle(): Promise<GetAssignorsResponseSchema[]> {
    const result = await this.service.execute();

    if (result.isLeft()) {
      switch (result.value.constructor) {
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return plainToInstance(GetAssignorsResponseSchema, result.value);
  }
}
