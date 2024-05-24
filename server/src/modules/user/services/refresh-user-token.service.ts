import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Either, right } from '@utils/either';

type RefreshUserTokenServiceResponse = Either<any, { access_token: string }>;

@Injectable()
export class RefreshUserTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(user: User): Promise<RefreshUserTokenServiceResponse> {
    const payload = { username: user.login, sub: user.id };

    try {
      return right({ access_token: await this.jwtService.signAsync(payload) });
    } catch (e) {
      return e;
    }
  }
}
