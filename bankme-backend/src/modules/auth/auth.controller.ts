import { Body, Controller, Post } from '@nestjs/common';

// SERVICES
import { AuthService } from './auth.service';

// DTOS
import { RegisterDTO } from './dtos/register.dto';
import { DoLoginDTO } from './dtos/do-login.dto';

@Controller('integrations/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(`register`)
	public async register(@Body() body: RegisterDTO) {
		return this.authService.register(body);
	}

	@Post(`login`)
	public async doLogin(@Body() body: DoLoginDTO) {
		return this.authService.doLogin(body);
	}
}
