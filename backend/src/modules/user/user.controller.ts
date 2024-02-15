import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto, CreateUserDto } from 'src/domain/dtos';
import { AuthUserUseCase, CreateUserUseCase } from './use-cases';

@Controller('auth')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authUserUseCase: AuthUserUseCase,
  ) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }

  @Post()
  async auth(@Body() userAuthDto: AuthUserDto) {
    return await this.authUserUseCase.execute(userAuthDto);
  }
}
