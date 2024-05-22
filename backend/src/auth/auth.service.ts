import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // private userService: UsersService,
  ) {}
  async signIn(signInDto: SignInDto) {
    //TODO: Implementar a busca do usuário no banco de dados
    const user = {
      username: 'admin',
      password: '$2b$10$Zf0uqZy8I6F5k4bXV4a0yOYp5gXt8Yb9Q9U2g9Z6y7U0nX1UWf9s2',
      role: 'admin',
    };
    // const user = await this.userService.findByUsername(signInDto.login, true);

    // if (!user) {
    //   throw new UnauthorizedException('Não autorizado');
    // }

    // const isPasswordValid = await this.comparePassword(
    //   signInDto.password,
    //   user.password,
    // );

    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Não autorizado');
    // }

    const payload = { username: signInDto.login, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1m',
      }),
    };
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
