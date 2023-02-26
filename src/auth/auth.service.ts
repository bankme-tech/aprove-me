import { Injectable, BadRequestException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import * as CryptoJS from 'crypto-js';
import { MessagesHelper } from './helpers/messages.helper';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException(
        MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND,
      );
    }
    if (user.password === dto.password) {
      //Gerar o token e passar o dto como parâmetro
    }
  }

  async register(dto: RegisterDto): Promise<User> {
    console.log('dto', dto);

    if (await this.verifyExistentUser(dto.email)) {
      throw new BadRequestException(MessagesHelper.REGISTER_EMAIL_FOUND);
      //Implementar um auto-login
    }

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
