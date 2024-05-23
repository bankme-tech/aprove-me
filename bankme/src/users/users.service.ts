import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UsersRepository from './users.repository';

@Injectable()
export class UsersService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async findUserByEmail(email: string) {
    const user = this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
