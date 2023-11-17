import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private SALT = 10;
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    const hashPassword = await bcrypt.hash(password, this.SALT);
    const result = await this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });

    delete result.password;

    return result;
  }

  async createSession(userId: number, token: { token: string }) {
    return await this.userRepository.createSession(userId, token.token);
  }

  async findLogin(login: string) {
    return await this.userRepository.findLogin(login);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `User with ID ${id} updated successfully`;
  }

  remove(id: number) {
    return `User with ID ${id} removed successfully`;
  }
}
