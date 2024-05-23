import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto, authDto } from '../dtos/auth.dto';
import { AuthUserUseCase } from '@/modules/integrations/use-cases/auth-user.use-case';
import { UsersViewModel } from '../view-models/users.view-model';

@Controller('integrations/auth')
export class AuthController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async auth(@Body(new ZodValidationPipe(authDto)) body: AuthDto) {
    const response = await this.authUserUseCase.execute(body);

    return {
      user: UsersViewModel.toHTTP(response.user),
      accessToken: response.accessToken,
    };
  }
}
