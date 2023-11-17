import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { Public } from './auth.guard';
import { IAuthService } from './interfaces/auth.service.interface';

@Controller('integrations/auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: IAuthService) {}

  @Public()
  @Post()
  signIn(@Body() { username, password }: SignInDTO) {
    return this.authService.signIn(username, password);
  }
}
