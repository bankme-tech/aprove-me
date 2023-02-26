import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  login(dto: LoginDto) {
    return dto;
  }

  async register(data: Prisma.UserCreateInput): Promise<User> {
    console.log('data', data);
    return this.prisma.user.create({
      data,
    });
  }
}
