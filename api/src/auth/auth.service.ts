import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionsService } from 'src/services/permissions.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private permissionsService: PermissionsService,
  ) { }

  async signIn(login: string, password: string): Promise<{ access_token: string }> {
    const isValid = await this.permissionsService.validateUser({ login, password });

    if (isValid) {
      const payload = { login };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
