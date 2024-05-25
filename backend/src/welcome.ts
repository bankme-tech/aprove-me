import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/')
export class Welcome {
  constructor() {}

  @Get()
  @HttpCode(HttpStatus.OK)
  welcome(): { message: string } {
    return {
      message: 'Seja bem-vindo à nossa bela API!',
    };
  }
}
