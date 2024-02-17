import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { AuthenticateDTO } from '@/user/dtos/user';
import { AuthenticateUseCase } from '@/user/use-cases/authenticate';

@Controller('/session')
export class AuthenticateController {
  constructor(private authenticate: AuthenticateUseCase) {}

  @Post()
  async handle(@Body() body: AuthenticateDTO, @Res() res: Response) {
    const { username, password } = body;

    const response = await this.authenticate.execute({
      username,
      password,
    });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}
