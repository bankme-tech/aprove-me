import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterPayableRequestSchema } from './request.schema';
import { RegisterPayableService } from '../../services/register-payable/register-payable.service';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterPayableResponseSchema } from './response.schema';
import { plainToInstance } from 'class-transformer';

@ApiTags('Payable')
@ApiBearerAuth()
@Controller('/integrations/payable')
export class RegisterPayableController {
  constructor(private service: RegisterPayableService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Payable registered.',
    type: RegisterPayableRequestSchema,
  })
  @ApiNotFoundResponse({ description: 'Assignor not found.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async handle(
    @Body() { assignor, emissionDate, value }: RegisterPayableRequestSchema,
  ): Promise<RegisterPayableResponseSchema> {
    const result = await this.service.execute({
      assignorId: assignor,
      emissionDate,
      value,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case NotFoundResource:
          throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);

        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return plainToInstance(RegisterPayableResponseSchema, result.value);
  }
}
