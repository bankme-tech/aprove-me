import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'aprovame',
      password: '$2b$10$V7H3MnmpVnpyIwOuL.pOx.qjOYt0BkbDVnqscHA5VJSm1lqogtIz2',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
