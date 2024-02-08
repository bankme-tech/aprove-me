import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Role } from '../role/role.enum';

@Injectable()
export class UserService {
  private readonly users = [];

  constructor() {
    const user = new User();
    user.login = 'aprovame';
    user.password = 'aprovame';
    user.roles = [Role.User];

    this.users.push(user);
  }

  async findOne(username: string): Promise<User> {
    return this.users.find(user => user.username === username);
  }
}