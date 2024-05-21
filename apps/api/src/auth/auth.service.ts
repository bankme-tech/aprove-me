import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/authenticate-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { compare, compareSync, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn({ login, password }: AuthDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { login },
      select: {
        id: true,
        password: true,
      },
    });

    if (!admin) {
      throw new UnauthorizedException('Unauthorized');
    }

    const match = await compare(password, admin.password);
    if (!match) {
      throw new UnauthorizedException('Unauthorized');
    }

    return {
      token: await this.jwtService.signAsync({}),
    };
  }

  async signUp({ login, password }: AuthDto) {
    const hashedPassword = await hash(password, 8);
    await this.prisma.admin.create({
      data: {
        login,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    return {
      token: await this.jwtService.signAsync({}),
    };
  }
}
