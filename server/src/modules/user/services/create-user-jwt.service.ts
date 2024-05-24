import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { InvalidJwtProvidedException } from '../exceptions/invalid-jwt-provided.exception';
import { Either, right, left } from '@utils/either';

type CreateUserJwtServiceResponse = Either<
  InvalidJwtProvidedException,
  { access_token: string }
>;

@Injectable()
export class CreateUserJwtService {
  constructor(private jwtService: JwtService) {}

  async execute(user: User): Promise<CreateUserJwtServiceResponse> {
    const payload = {
      username: user.login,
      sub: user.id,
    };

    try {
      return right({
        access_token: await this.jwtService.signAsync(payload),
      });
    } catch (e) {
      return left(new InvalidJwtProvidedException());
    }
  }
}
