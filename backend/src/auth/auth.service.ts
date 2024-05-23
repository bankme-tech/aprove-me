import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import {
  hashPassword as hashPasswordd,
  comparePassword as comparePasswordd,
} from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}
  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByUsername(signInDto.login, true);

    if (!user) {
      throw new UnauthorizedException('Não autorizado');
    }

    const isPasswordValid = await this.comparePassword(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Não autorizado');
    }

    const payload = { username: signInDto.login, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1m',
      }),
    };
  }

  async hashPassword(password: string) {
    return hashPasswordd(password);
  }

  async comparePassword(password: string, hash: string) {
    return comparePasswordd(password, hash);
  }
}
