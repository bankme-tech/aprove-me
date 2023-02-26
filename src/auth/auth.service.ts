import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  login(dto: LoginDto) {
    return dto;
  }

  async register(dto: RegisterDto): Promise<User> {
    console.log('dto', dto);

    dto.password = CryptoJS.AES.encrypt(
      dto.password,
      process.env.USER_CYPHER_SECRET_KEY,
    ).toString();
    console.log('Senha Encriptada', dto.password);

    return this.prisma.user.create({
      data: dto,
    });
  }

  async verifyExistentUser(email: string): Promise<boolean> {
    const result = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (result) {
      console.log('Usuário já existe....!');
      return true;
    }

    return false;
  }
}
