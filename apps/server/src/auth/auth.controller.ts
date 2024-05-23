import { ZodValidationPipe } from '@/common/pipe/zod-validation.pipe'
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthSchema, authSchema } from './dto/sign-in-auth.dto'

const signInValidationPipe = new ZodValidationPipe(authSchema)

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body(signInValidationPipe) data: AuthSchema) {
    return this.authService.signIn(data)
  }

  @Post('sign-up')
  signUp(@Body(signInValidationPipe) data: AuthSchema) {
    return this.authService.signUp(data)
  }
}
