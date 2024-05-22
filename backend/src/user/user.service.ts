import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import UserRepository from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findByLogin(createUserDto.login);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.userRepository.create({ ...data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByLogin(login: string): Promise<User> {
    return this.userRepository.findByLogin(login);
  }
}
