import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthenticateDto,
  authenticateSchema,
} from './dto/authenticate-auth.dto';
import { ZodValidationPipe } from '../zod-validation/zod-validation.pipe';
import { RegisterDto, registerSchema } from './dto/register-auth.dto';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  signIn(
    @Body(new ZodValidationPipe(authenticateSchema))
    authDto: AuthenticateDto,
  ) {
    return this.authService.signIn(authDto);
  }

  @Post('register')
  signUp(
    @Body(new ZodValidationPipe(registerSchema))
    authDto: RegisterDto,
  ) {
    return this.authService.signUp(authDto);
  }
}
