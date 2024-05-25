import { UserDto } from '../DTOs/user';
import { UserRepo } from '../repositories/user-repo';
import { CreateToken } from './toke';
export declare class AuthService {
    private user;
    private jwt;
    constructor(user: UserRepo, jwt: CreateToken);
    authenticate(body: UserDto): Promise<{
        token: string;
    }>;
}
