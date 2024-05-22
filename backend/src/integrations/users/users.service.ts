import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      login: 'aprovame',
      password: 'aprovame',
    },
  ];

  async findOne(login: string): Promise<User | undefined> {
    return this.users.find((user) => user.login === login);
  }
}
