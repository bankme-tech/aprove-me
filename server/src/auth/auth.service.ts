import { Injectable, BadRequestException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import * as CryptoJS from 'crypto-js';
import { MessagesHelper } from './helpers/messages.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException(
        MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND,
      );
    } else {
      const bytes = CryptoJS.AES.decrypt(
        user.password,
        process.env.USER_CYPHER_SECRET_KEY,
      );
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === dto.password) {
        const payload = { email: user.email, sub: user.id };
        return {
          email: user.email,
          name: user.name,
          token: this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
          }),
        };
      }
      return null;
    }
  }

  async register(dto: RegisterDto): Promise<User> {
    if (await this.verifyExistentUser(dto.email)) {
      throw new BadRequestException(MessagesHelper.REGISTER_EMAIL_FOUND);
      //Implementar um auto-login
    }

    dto.password = CryptoJS.AES.encrypt(
      dto.password,
      process.env.USER_CYPHER_SECRET_KEY,
    ).toString();

    return this.prisma.user.create({
      data: dto,
    });
  }

  async verifyExistentUser(email: string): Promise<boolean> {
    const result = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (result) {
      return true;
    }

    return false;
  }
}
