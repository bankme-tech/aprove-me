import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from 'src/client';
import { LoginDto } from './dto/login.dto';
import { generateToken } from '../../services/jwt';

@Injectable()
export class AuthService {
  async login(user: LoginDto) {
    const authUser = await prisma.user.findUnique({ 
      where: { username: user.login }
    });

    if (!authUser) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND)
    };

    if (authUser.password !== user.password) {
      throw new HttpException('Incorrect Credentials!', HttpStatus.NOT_FOUND)
    }

    const token = generateToken(user);

    return {token, user: authUser};
  }
}
