import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interface/users-repository.interface';
import { IUser } from './interface/user.interface';
import { IUsersService } from './interface/users-service.interface';
import { UsersRepository } from '../../infra/database/repositories/users.repository';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async findByUsername(username: string): Promise<IUser | undefined> {
    return this.userRepository.findByUsername(username);
  }
}
