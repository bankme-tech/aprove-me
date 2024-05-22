import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthenticateAccountRequestSchema } from './request.schema';
import { AuthenticateAccountService } from '../../services/authenticate-account/authenticate-account.service';
import { InvalidCredentials } from '~/common/exceptions/invalid-credentials.exception';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticateAccountResponseSchema } from './response.schema';
import { plainToInstance } from 'class-transformer';

@ApiTags('Auth')
@Controller('/integrations/auth')
export class AuthenticateAccountController {
  constructor(private service: AuthenticateAccountService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Access token generate.',
    type: AuthenticateAccountResponseSchema,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async handle(
    @Body() { login, password }: AuthenticateAccountRequestSchema,
  ): Promise<AuthenticateAccountResponseSchema> {
    const result = await this.service.execute({ login, password });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case NotFoundResource:
        case InvalidCredentials:
          throw new HttpException(
            'Login or password are incorrect.',
            HttpStatus.BAD_REQUEST,
          );

        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
      }
    }

    return plainToInstance(AuthenticateAccountResponseSchema, result.value);
  }
}
