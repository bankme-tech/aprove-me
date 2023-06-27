import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto, SignInOutput } from 'src/dtos/signin.dto';
import { AuthMiddleware } from './auth.middleware';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post()
  signIn(@Body() signInData: SignInDto): Promise<SignInOutput> {
    return this.authService.signIn(signInData);
  }

  @UseGuards(AuthMiddleware)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
