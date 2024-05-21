import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthenticateAccountRequestSchema } from './request.schema';
import { AuthenticateAccountService } from '../services/authenticate-account/authenticate-account.service';
import { InvalidCredentials } from '~/common/exceptions/invalid-credentials.exception';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

@Controller('/integrations/auth')
export class AuthenticateAccountController {
  constructor(private service: AuthenticateAccountService) {}

  @Post()
  async handle(@Body() { login, password }: AuthenticateAccountRequestSchema) {
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

    return result.value;
  }
}
