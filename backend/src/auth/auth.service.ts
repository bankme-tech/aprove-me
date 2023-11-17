import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '1m';
  private ISSUER = 'Bankme';
  private AUDIENCE = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { login } = signUpDto;
    const user = await this.usersService.findLogin(login);

    if (user !== null) {
      throw new ConflictException('Login alread in use!');
    }

    return await this.usersService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { login, password } = signInDto;
    const user = await this.usersService.findLogin(login);

    if (!user) throw new UnauthorizedException('Login or password not valid.');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Login or password not valid.');

    const token = await this.createToken(user);
    return await this.usersService.createSession(user.id, token);
  }

  createToken(user: User) {
    const { id, login } = user;

    const token = this.jwtService.sign(
      { login },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );
    return { token };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: this.AUDIENCE,
      issuer: this.ISSUER,
    });
    return data;
  }
}
