import { User } from '@prisma/client';
import UserRepository from './userRepository';
import { PrismaService } from 'src/database/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class PrismaUserRepository extends UserRepository {
  constructor(public readonly prisma: PrismaService) {
    super();
  }

  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const { email, password } = createUserDTO;

    const userExists = await this.findByEmail(email);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
}
