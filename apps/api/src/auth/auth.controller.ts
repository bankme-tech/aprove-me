import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, signInSchema } from './dto/authenticate-auth.dto';
import { ZodValidationPipe } from '../zod-validation/zod-validation.pipe';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  authenticate(
    @Body(new ZodValidationPipe(signInSchema))
    signInDto: SignInDto,
  ) {
    return this.authService.signIn(signInDto);
  }
}
