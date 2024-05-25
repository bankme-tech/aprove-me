import { Controller, HttpStatus, Get, HttpCode } from '@nestjs/common';

@Controller('/')
export class AppController {
  constructor() {}

  @Get()
  @HttpCode(HttpStatus.OK)
  welcome(): { message: string } {
    return {
      message: 'Seja bem-vindo à nossa bela API!',
    };
  }
}
