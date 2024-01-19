import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import { signInSchema, SignInSchema } from './auth.schema';
import { Public } from '../../decorators/public.decorator';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  async current(@Request() req) {
    return { data: req.user };
  }

  @Post()
  @Public()
  async signin(
    @Body(new ZodValidationPipe(signInSchema)) payload: SignInSchema,
  ) {
    const validated = await this.service.signIn(
      payload.login,
      payload.password,
    );

    if (!validated) {
      throw new UnauthorizedException();
    }

    return {
      token: await this.service.token(validated),
      data: validated,
    };
  }

  @Post('signup')
  @Public()
  async signup(
    @Body(new ZodValidationPipe(signInSchema)) payload: SignInSchema,
  ) {
    const validated = await this.service.signUp(
      payload.login,
      payload.password,
    );

    return {
      token: await this.service.token(validated),
      data: validated,
    };
  }
}
