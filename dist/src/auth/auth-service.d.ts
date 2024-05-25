import { UserDto } from '../DTOs/user';
import { UserRepo } from '../repositories/user-repo';
import { TokenValidator } from './toke';
export declare class AuthService {
    private user;
    private jwt;
    constructor(user: UserRepo, jwt: TokenValidator);
    authenticate(body: UserDto): Promise<{
        token: string;
    }>;
}
