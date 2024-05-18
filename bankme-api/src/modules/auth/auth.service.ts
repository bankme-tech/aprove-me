import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from 'src/client';
import { LoginDto } from './dto/login.dto';
import { generateToken } from '../../services/jwt';

@Injectable()
export class AuthService {
  async login(user: LoginDto) {
    const theUser = await prisma.user.findUnique({ 
      where: { username: user.login }
    });

    if (!theUser) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND)
    };

    if (theUser.password !== user.password) {
      throw new HttpException('Incorrect Credentials!', HttpStatus.NOT_FOUND)
    }

    const token = generateToken(user);

    return {token, user: theUser};
  }
}
