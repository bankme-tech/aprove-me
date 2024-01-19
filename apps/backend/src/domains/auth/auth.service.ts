import * as bcrypt from 'bcryptjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(login: string, password: string) {
    const previous = await this.prisma.user.findUnique({ where: { login } });

    if (previous) {
      throw new BadRequestException([
        { code: 'user_already_exists', message: 'User already registered' },
      ]);
    }

    return this.prisma.user.create({
      data: {
        login,
        password: await bcrypt.hash(password, 10),
      },
      select: {
        id: true,
        login: true,
      },
    });
  }

  async signIn(login: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { login } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return false;
    }

    return {
      id: user.id,
      login: user.login,
    };
  }

  token(payload: Record<string, unknown> = {}) {
    return this.jwt.signAsync(payload, { secret: process.env.API_TOKEN });
  }
}
