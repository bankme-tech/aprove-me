import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, authSchema } from './dto/authenticate-auth.dto';
import { ZodValidationPipe } from '../zod-validation/zod-validation.pipe';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(
    @Body(new ZodValidationPipe(authSchema))
    authDto: AuthDto,
  ) {
    return this.authService.signIn(authDto);
  }

  @Post()
  signUp(
    @Body(new ZodValidationPipe(authSchema))
    authDto: AuthDto,
  ) {
    return this.authService.signUp(authDto);
  }
}
