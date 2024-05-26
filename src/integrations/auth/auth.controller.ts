import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthService } from './auth.service'

@Controller('integrations')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('auth')
  async login(@Body() body: {
    login: string;
    password: string
  }, @Res() res: Response)  {
    const token = await this.authService.login(body.login, body.password);

    return await res.status(HttpStatus.OK).json({
      data: token,
      status: HttpStatus.OK,
      message: 'Authenticated successfully.'
    })
  }
}