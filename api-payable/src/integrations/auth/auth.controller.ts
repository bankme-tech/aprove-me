import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from './interfaces/user.interface';
import { CredentialsDto } from './dtos/credentials.dto';
import { AuthGuard, ReqAuthorized } from './auth.guard';

@Controller('/integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async create(@Body() dto: CredentialsDto): Promise<IUser> {
    return this.authService.registerUser({
      login: dto.login,
      password: dto.password,
    });
  }

  @Post('login')
  public async login(@Body() dto: CredentialsDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard)
  @Get('token')
  public async token(@Request() req: ReqAuthorized) {
    return { user: req.user };
  }
}
