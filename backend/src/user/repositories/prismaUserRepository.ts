import { User } from '@prisma/client';
import UserRepository from './userRepository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export default class PrismaUserRepository extends UserRepository {
  constructor(public readonly prisma: PrismaService) {
    super();
  }

  findByLogin(login: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { login } });
  }

  create(createUserDTO: CreateUserDTO): Promise<User> {
    const { login, password } = createUserDTO;

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return this.prisma.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });
  }
}
