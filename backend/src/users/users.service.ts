import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async create(data: Prisma.UserCreateInput): Promise<{login:string; password: string;}> {
    const saltOrRounds = 10;
    const user = await this.prisma.user.findFirst({ where: { login: data.login } })
    if (user) {
      throw new BadRequestException('User already exists')
    }
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    const createdUser = await this.prisma.user.create({
      data: {
        login: data.login,
        password: hash,
      }
    });
    return {login:data.login, password: data.password}
  }

  async login(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.findUnique({
      where: { login: data.login },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, login: user.login };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '60s',
        secret: process.env.JWT_SECRET
      }),
    };

  }
}
