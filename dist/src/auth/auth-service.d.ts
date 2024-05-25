import { UserDto } from '../DTOs/user';
import { UserRepo } from '../repositories/user-repo';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private user;
    private jwt;
    constructor(user: UserRepo, jwt: JwtService);
    authenticate(body: UserDto): Promise<{
        token: string;
    }>;
}
