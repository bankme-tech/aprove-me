import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
}
