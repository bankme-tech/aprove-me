import { Injectable } from '@nestjs/common';
import UserRepository from './repositories/userRepository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findByLogin(login: string) {
    return this.userRepository.findByLogin(login);
  }
}
