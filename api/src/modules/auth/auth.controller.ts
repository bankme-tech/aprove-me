import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { Public } from './auth.guard';

@Controller('integrations/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  signIn(@Body() { username, password }: SignInDTO) {
    return this.authService.signIn(username, password);
  }
}
