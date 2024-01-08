import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { signInSchema, SignInSchema } from './auth.schema';
import { Public } from 'src/decorators/public.decorator';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

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
