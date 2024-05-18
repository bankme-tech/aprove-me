import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findByLogin(login: string) {
    const user = await this.userRepository.findByLogin(login);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
