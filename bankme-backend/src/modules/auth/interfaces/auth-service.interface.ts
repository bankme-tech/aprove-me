// DTOS
import { DoLoginDTO } from '../dtos/do-login.dto';
import { RegisterDTO } from '../dtos/register.dto';

export interface IAuthService {
	register(data: RegisterDTO): Promise<void>;
	doLogin(data: DoLoginDTO): Promise<{ token: string }>;
}
