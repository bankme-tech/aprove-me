import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserUseCase } from '@/user/use-cases/create-user';
import { CreateUserDTO } from '@/user/dtos/user';

@Controller('/integrations/user')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  async handle(@Body() body: CreateUserDTO, @Res() res: Response) {
    const { username, password } = body;

    const response = await this.createUser.execute({
      username,
      password,
    });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}
