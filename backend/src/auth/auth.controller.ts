import { Body, Controller, Post } from '@nestjs/common';
import { AssignorService } from '../assignor/assignor.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AssignorService) {}

  @Post()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }
}
