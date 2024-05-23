import { IUseCase } from '@/core/use-cases/interfaces';
import { UsersRepository } from '../domain/repositories/users.repository';
import { UserNotFoundError } from './errors/user-not-found.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByLoginUseCase implements IUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute(login: string) {
    const user = await this.usersRepository.findByLogin(login);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
