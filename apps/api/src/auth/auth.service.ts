import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcryptjs';
import { RegisterDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn({ email, password }: AuthenticateDto) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const match = await compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return {
      token: await this.jwtService.signAsync({ id: user.id }),
    };
  }

  async signUp({ email, name, password }: RegisterDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await hash(password, 8);
    const { id } = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    return {
      token: await this.jwtService.signAsync({ id }),
    };
  }
}
