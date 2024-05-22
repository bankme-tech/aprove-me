import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetPayablesService } from '../../services/get-payables/get-payables.service';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetPayablesResponseSchema } from './response.schema';
import { plainToInstance } from 'class-transformer';

@ApiTags('Payable')
@ApiBearerAuth()
@Controller('/integrations/payables')
export class GetPayablesController {
  constructor(private service: GetPayablesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Payables found.',
    type: [GetPayablesResponseSchema],
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async handle(): Promise<GetPayablesResponseSchema[]> {
    const result = await this.service.execute();

    if (result.isLeft()) {
      switch (result.value.constructor) {
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return plainToInstance(GetPayablesResponseSchema, result.value);
  }
}
