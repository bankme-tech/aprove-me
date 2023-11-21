import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) {}
    async login(login: string, password: string) {
        if (login !== 'aprovame' || password !== 'aprovame') {
            return null;
        }
    
        const payload = {
            login,
            password,
            sub: 1,
        };

        return {
            access_token: this.jwtService.sign(payload),
            expires_in: 60,
        };
    }
}
